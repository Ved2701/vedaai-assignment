import { create } from "zustand";

interface QuestionType {
  type: string;
  questions: number;
  marks: number;
}

interface AssignmentState {

  subject: string;

  classLevel: string;

  dueDate: string;

  additionalInfo: string;

  questionTypes: QuestionType[];

  setSubject: (subject: string) => void;

  setClassLevel: (level: string) => void;

  setDueDate: (date: string) => void;

  setAdditionalInfo: (info: string) => void;

  setQuestionTypes: (
    questions: QuestionType[]
  ) => void;
}

export const useAssignmentStore =
  create<AssignmentState>((set) => ({

    subject: "",

    classLevel: "",

    dueDate: "",

    additionalInfo: "",

    questionTypes: [],

    setSubject: (subject) =>
      set({ subject }),

    setClassLevel: (classLevel) =>
      set({ classLevel }),

    setDueDate: (dueDate) =>
      set({ dueDate }),

    setAdditionalInfo: (additionalInfo) =>
      set({ additionalInfo }),

    setQuestionTypes: (questionTypes) =>
      set({ questionTypes }),

  }));