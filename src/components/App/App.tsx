import {
    Routes,
    Route,
    Outlet,
    useNavigate,
    useResolvedPath,
} from 'react-router-dom'
import { AppBar, Box, Toolbar, Button, Container } from '@mui/material'

import { ProtectedRoute, RedirectIfLoggedIn, Status, useAuth } from '../Auth'
import { Users } from '../Users'
import { Login } from '../Auth'
import { Home } from '../Home'
import { Link } from '../Link'

export const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RedirectIfLoggedIn>
                            <Login />
                        </RedirectIfLoggedIn>
                    }
                />
            </Route>
        </Routes>
    )
}

const Layout = () => {
    const auth = useAuth()

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Link 
                            underline="none"
                            to="/"
                        >
                            Home
                        </Link>
                        {!auth.accessToken && (
                            <Link 
                                underline="none"
                                marginLeft={1} 
                                to="/login"
                            >
                                Login
                            </Link>
                        )}
                        {!!auth.accessToken && (
                            <Link 
                                underline="none" 
                                marginLeft={1} 
                                to="/users"
                            >
                                Users
                            </Link>
                        )}
                        <Box sx={{ flexGrow: 1 }} />
                        <Status />
                    </Toolbar>
                </AppBar>
                <Container sx={{ paddingTop: '20px' }}>
                    <Outlet />
                </Container>
            </Box>
        </>
    )
}
