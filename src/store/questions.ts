import { create } from 'zustand'
import { type IQuestion } from '../types'

interface state {
    questions: IQuestion[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
}

export const useQuestionStore = create<state>((set) => ({
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
        const res = await fetch('http://localhost:5173/data.json')
        const json = await res.json()
        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

        set({ questions })
    },
}))
