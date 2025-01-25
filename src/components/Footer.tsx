import { RestartAlt } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useQuestionData } from '../hooks/useQuestionData'
import { useQuestionStore } from '../store/questions'

export const Footer = () => {
    const { correct, incorrect, unanswered } = useQuestionData()
    const reset = useQuestionStore((store) => store.reset)
    return (
        <footer style={{ marginTop: '16px' }}>
            <strong>
                ✅ {correct} correctas - ❌{incorrect} incorrectas - ❓
                {unanswered} sin responder
            </strong>
            <IconButton onClick={() => reset()} color="warning" sx={{ ml: 2 }}>
                <RestartAlt />
            </IconButton>
        </footer>
    )
}
