import { Button } from '@mui/material'

export const StartButton = () => {
    return (
        <Button
            variant="contained"
            onClick={() => console.log('Hello, World!')}
        >
            Empezar
        </Button>
    )
}
