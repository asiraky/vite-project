import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Box, TextField, Button, Alert, FormGroup } from '@mui/material'

import { useAuth } from './'

type LoginProps = {
    children?: React.ReactNode
}

export const Login: React.FC<LoginProps> = ({}) => {
    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    const from = (location.state as any)?.from?.pathname || '/'

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (await auth.login(email, password)) {
            setError(null)
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, { replace: true })
        } else {
            setError('Invalid credentials')
        }
    }

    return (
        <div>
            {from !== '/' && (
                <Alert severity="info">
                    You must log in to view the page at {from}
                </Alert>
            )}
            <Container
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{
                    marginTop: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 600
                }}
            >
                <FormGroup>
                    <TextField
                        name="email"
                        label="Email"
                        className="text"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        error={!!error}
                        helperText={error}
                        margin="normal"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        className="text"
                        autoComplete="current-password"
                        value={password}
                        error={!!error}
                        margin="normal"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        required
                    />
                </FormGroup>
                <Box sx={{ display: 'flex' }}>
                    <Box component="div" sx={{ flexGrow: 1 }} />
                    <Button type="submit" variant="contained" size="large">
                        Login
                    </Button>
                </Box>
            </Container>
        </div>
    )
}
