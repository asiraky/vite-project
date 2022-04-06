import React from 'react'
import { User } from '../Users/Users'

import { AuthContext, AuthContextType } from './AuthContext'

function login(email: string): Promise<User> {
    return new Promise((r) => r({ email }))
}

function logout(): Promise<void> {
    return new Promise((r) => r())
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null)

    const value: AuthContextType = {
        user,
        login: async (email: string) => {
            setUser(null)
            const user = await login(email)
            setUser(user)
        },
        logout: async () => {
            await logout()
            setUser(null)
        },
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
