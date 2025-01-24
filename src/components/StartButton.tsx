import { Button } from '@mui/material'
import { useQuestionStore } from '../store/questions'

export const StartButton = () => {
    const fetchQuestions = useQuestionStore((state) => state.fetchQuestions)

    const handleClick = () => {
        fetchQuestions(5)
    }
    return (
        <Button variant="contained" onClick={handleClick}>
            Empezar
        </Button>
    )
}
