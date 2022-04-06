import { Navigate } from 'react-router-dom'

export type ProtectedRouteProps = {
    outlet: JSX.Element
}

export default function ProtectedRoute({ outlet }: ProtectedRouteProps) {
    const isAuthenticated = localStorage.getItem('access_token')

    if (isAuthenticated !== null) {
        return outlet
    } else {
        return <Navigate to={{ pathname: '/login' }} />
    }
}
