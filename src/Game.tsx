import {
    Card,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionStore } from './store/questions'
import { type IQuestion } from './types'

type QuestionProp = {
    info: IQuestion
}

const Question = ({ info }: QuestionProp) => {
    return (
        <Card
            variant="outlined"
            sx={{ bgcolor: '#222', mt: 2, p: 2, textAlign: 'left' }}
        >
            <Typography variant="h5">{info.question}</Typography>
            <SyntaxHighlighter
                language="javascript"
                style={atomOneDarkReasonable}
            >
                {info.code}
            </SyntaxHighlighter>
            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((answer, i) => (
                    <ListItem key={i} disablePadding divider>
                        <ListItemButton>
                            <ListItemText
                                primary={answer}
                                sx={{ textAlign: 'center' }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const questions = useQuestionStore((state) => state.questions)
    const currentQuestion = useQuestionStore((state) => state.currentQuestion)

    const questionInfo = questions[currentQuestion]

    return <Question info={questionInfo} />
}
