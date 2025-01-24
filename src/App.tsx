import { Stack } from '@mui/material'
import './App.css'
import { Header } from './components/Header'
import { JavaScriptLogo } from './components/JavaScriptLogo'
import { StartButton } from './components/StartButton'
import { Game } from './Game'
import { useQuestionStore } from './store/questions'

function App() {
    const questions = useQuestionStore((state) => state.questions)
    console.log(questions)

    return (
        <>
            <Stack direction={'row'} gap={0.5} alignItems={'center'}>
                <JavaScriptLogo />
                <Header />
            </Stack>

            {questions.length === 0 && <StartButton />}
            {questions.length > 0 && <Game />}
        </>
    )
}

export default App
