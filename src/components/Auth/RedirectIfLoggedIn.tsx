import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from './useAuth'

type RedirectIfLoggedInProps = {
    children: JSX.Element
}

export const RedirectIfLoggedIn: React.FC<RedirectIfLoggedInProps> = ({
    children,
}) => {
    const auth = useAuth()

    if (auth.accessToken) {
        return <Navigate to="/" replace />
    }

    return children
}
