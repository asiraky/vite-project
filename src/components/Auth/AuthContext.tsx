import { createContext } from 'react'

import { User } from '../Users/Users'

export type AuthContextType = {
    user: User | null
    accessToken: string | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(null!)
