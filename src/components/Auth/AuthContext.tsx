import { createContext } from 'react'

export type AuthContextType = {
    accessToken: string | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(null!)
