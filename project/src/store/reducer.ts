import {createReducer} from '@reduxjs/toolkit';
import {incrementStep, checkUserAnswer, loadQuestions, setQuestionsDataLoadingStatus, resetGame} from './action';
import {isAnswerCorrect} from '../game';
import {FIRST_GAME_STEP} from '../const';
import {Questions} from '../types/question';

const STEP_COUNT = 1;

type InitalState = {
  mistakes: number;
  step: number;
  questions: Questions;
  isQuestionsDataLoading: boolean;
}

const initialState: InitalState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  questions: [],
  isQuestionsDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementStep, (state) => {
      state.step = state.step + STEP_COUNT;
    })
    .addCase(checkUserAnswer, (state, action) => {
      const {question, userAnswer} = action.payload;

      state.mistakes += Number(!isAnswerCorrect(question, userAnswer));
    })
    .addCase(resetGame, (state) => {
      state.mistakes = 0;
      state.step = FIRST_GAME_STEP;
    })
    .addCase(loadQuestions, (state, action) => {
      state.questions = action.payload;
    })
    .addCase(setQuestionsDataLoadingStatus, (state, action) => {
      state.isQuestionsDataLoading = action.payload;
    });
});

export {reducer};
