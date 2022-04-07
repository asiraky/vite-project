import { createContext } from 'react'

import { User } from '../Users/Users'

export type AuthContextType = {
    user: User | null
    login: (email: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(null!)
