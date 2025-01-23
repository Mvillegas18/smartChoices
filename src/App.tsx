import { Stack } from '@mui/material'
import './App.css'
import { Header } from './components/Header'
import { JavaScriptLogo } from './components/JavaScriptLogo'

function App() {
    return (
        <>
            <Stack direction={'row'} gap={0.5} alignItems={'center'}>
                <JavaScriptLogo />
                <Header />
            </Stack>
        </>
    )
}

export default App
