import confetti from 'canvas-confetti'
import { create } from 'zustand'
import { type IQuestion } from '../types'

interface state {
    questions: IQuestion[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPreviousQuestion: () => void
}

export const useQuestionStore = create<state>((set, get) => ({
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
        const res = await fetch('http://localhost:5173/data.json')
        const json = await res.json()
        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

        set({ questions })
    },
    selectAnswer: (questionId, answerIndex) => {
        const { questions } = get()

        // Clone the questions array
        const newQuestions = structuredClone(questions)

        // Find the question index
        const questionIndex = newQuestions.findIndex((q) => q.id === questionId)

        // Find the question
        const infoQuestion = newQuestions[questionIndex]

        // Check if the answer is correct
        const isCorrectAnswer = infoQuestion.correctAnswer === answerIndex
        if (isCorrectAnswer) confetti()
        // Update the question with the user's answer
        newQuestions[questionIndex] = {
            ...infoQuestion,
            isCorrectUserAnswer: isCorrectAnswer,
            userSelectedAnswer: answerIndex,
        }

        // Update the state
        set({ questions: newQuestions })
    },
    goNextQuestion: () => {
        const { currentQuestion, questions } = get()

        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion })
        }
    },
    goPreviousQuestion: () => {
        const { currentQuestion } = get()

        const previousQuestion = currentQuestion - 1
        if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion })
        }
    },
}))
