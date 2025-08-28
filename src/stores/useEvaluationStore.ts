import { create } from 'zustand';

import { CreateAnswerValues } from 'src/models/StudentAnswer.model';

interface IEvaluationState {
  startTime?: Date;
  setStartTime: (date: Date) => void;
  answers: CreateAnswerValues[];
  setAnswers: (answers: CreateAnswerValues[]) => void;
  updateMultipleQuestion: (
    index: number,
    optIndex: number,
    isChoose: boolean,
  ) => void;
  updateCompleteQuestion: (
    index: number,
    optIndex: number,
    text: string,
  ) => void;
  updateTrueOrFalseQuestion: (
    index: number,
    optIndex: number,
    isChoose: boolean,
  ) => void;
}

const useEvaluationStore = create<IEvaluationState>()((set) => ({
  startTime: undefined,
  setStartTime: (startTime) => set((state) => ({ ...state, startTime })),
  // endTime: undefined,
  // setEndTime: (endTime) => set((state) => ({ ...state, endTime })),
  answers: [],
  setAnswers: (answers) => set((state) => ({ ...state, answers })),
  updateMultipleQuestion: (index, optIndex, isChoose) =>
    set((state) => {
      const answers = [...state.answers];
      const newAnswers = answers[index];
      newAnswers.options[optIndex].isChoose = isChoose;
      answers[index] = newAnswers;
      return { ...state, answers };
    }),
  updateCompleteQuestion: (index, optIndex, text) =>
    set((state) => {
      const answers = [...state.answers];
      const newAnswers = answers[index];
      newAnswers.options[optIndex].text = text;
      newAnswers.options[optIndex].isChoose = text.length > 0;
      answers[index] = newAnswers;
      return { ...state, answers };
    }),
  updateTrueOrFalseQuestion: (index, optIndex, isChoose) =>
    set((state) => {
      const answers = [...state.answers];
      const newAnswers = answers[index];
      newAnswers.options[optIndex].isChoose = isChoose;
      const otherIndex = optIndex === 0 ? 1 : 0;
      newAnswers.options[otherIndex].isChoose = !isChoose;
      answers[index] = newAnswers;
      return { ...state, answers };
    }),
}));

export default useEvaluationStore;
