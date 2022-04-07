import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './'

type StatusProps = {
    children?: React.ReactNode
}

export const Status: React.FC<StatusProps> = ({}) => {
    const auth = useAuth()
    const navigate = useNavigate()

    if (!auth.user) {
        return <p>You are not logged in.</p>
    }

    return (
        <p>
            Welcome {auth.user.first_name}!{' '}
            <button
                onClick={async () => {
                    await auth.logout()
                    navigate('/')
                }}
            >
                Sign out
            </button>
        </p>
    )
}
