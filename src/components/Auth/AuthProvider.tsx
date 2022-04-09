import React from 'react'

import { AuthContext, AuthContextType } from './AuthContext'

async function login(email: string, password: string): Promise<string> {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password,
        }),
    })

    if (!response.ok) {
        throw Error('Login failed')
    }

    const json = await response.json()

    return json.access_token
}

function logout(): Promise<void> {
    return new Promise((r) => r())
}

export const AuthProvider: React.FC = ({ children }) => {
    const [accessToken, setAccessToken] = React.useState<string | null>(null)

    const value: AuthContextType = {
        accessToken,
        login: async (email: string, password: string) => {
            setAccessToken(null)
            try {
                const responseAccessToken = await login(email, password)
                setAccessToken(responseAccessToken)
                return true
            } catch (err) {
                console.error('Login failed')
                return false
            }
        },
        logout: async () => {
            await logout()
            setAccessToken(null)
        },
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
