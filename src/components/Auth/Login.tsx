import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Alert, FormGroup } from '@mui/material'

import './Login.css'
import { useAuth } from './'

type LoginProps = {
    children?: React.ReactNode
}

export const Login: React.FC<LoginProps> = ({}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()

    const from = (location.state as any)?.from?.pathname || '/'

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string

        auth.login(email)

        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true })
    }

    return (
        <div>
            {from && (
                <Alert severity="info">
                    You must log in to view the page at {from}
                </Alert>
            )}
            <Box
                noValidate
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{
                    marginTop: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <FormGroup>
                    <TextField
                        name="email"
                        label="Email"
                        className="text"
                        autoComplete="email"
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
                        required
                    />
                </FormGroup>
                <Button type="submit" variant="contained" size="large">
                    Login
                </Button>
            </Box>
        </div>
    )
}
