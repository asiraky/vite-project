import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import { AppBar, Box, Toolbar, Button, Container } from '@mui/material'

import { Users } from '../Users'
import { Login } from '../Auth'
import { ProtectedRoute, RedirectIfLoggedIn, Status } from '../Auth'

const App = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    path="/"
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
    const navigate = useNavigate()
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Button
                            onClick={() => navigate('/login')}
                            color="inherit"
                        >
                            Login
                        </Button>
                        <Button onClick={() => navigate('/')} color="inherit">
                            Users
                        </Button>
                        <Box sx={{ flexGrow: 1 }} />
                        <Status />
                    </Toolbar>
                </AppBar>
                <Container sx={{ paddingTop: '20px' }} maxWidth="sm">
                    <Outlet />
                </Container>
            </Box>
        </>
    )
}

export default App
