import { ArrowBack, ArrowForward } from '@mui/icons-material'
import {
    Card,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Footer } from './components/Footer'
import { useQuestionStore } from './store/questions'
import { type IQuestion } from './types'

type QuestionProp = {
    info: IQuestion
}

const createBackgroundColor = (info: IQuestion, index: number) => {
    const { correctAnswer, userSelectedAnswer } = info
    if (userSelectedAnswer == null) {
        return 'transparent'
    }

    // If the answer is incorret and the user not selected it
    if (index !== correctAnswer && index !== userSelectedAnswer) {
        return 'transparent'
    }

    // If the answer is correct
    if (index === correctAnswer) {
        return '#4caf50'
    }

    // If the answer is incorrect
    if (index === userSelectedAnswer) {
        return '#f44336'
    }

    return 'transparent'
}
const Question = ({ info }: QuestionProp) => {
    const selectAnswer = useQuestionStore((state) => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

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
                        <ListItemButton
                            disabled={info.userSelectedAnswer != null}
                            onClick={createHandleClick(i)}
                            sx={{ bgcolor: createBackgroundColor(info, i) }}
                        >
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
    const goNextQuestion = useQuestionStore((state) => state.goNextQuestion)
    const goPreviousQuestion = useQuestionStore(
        (state) => state.goPreviousQuestion
    )

    const questionInfo = questions[currentQuestion]

    return (
        <>
            <Stack
                direction={'row'}
                gap={2}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <IconButton
                    onClick={goPreviousQuestion}
                    disabled={currentQuestion === 0}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant={'h6'}>
                    {currentQuestion + 1}/{questions.length}
                </Typography>
                <IconButton
                    onClick={goNextQuestion}
                    disabled={currentQuestion >= questions.length - 1}
                >
                    <ArrowForward />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer />
        </>
    )
}
