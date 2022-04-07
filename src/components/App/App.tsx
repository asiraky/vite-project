import { Routes, Route, Link, Outlet } from 'react-router-dom'

import { Login } from '../Auth/Login'
import { ProtectedRoute, RedirectIfLoggedIn, Status } from '../Auth'
import Users from '../Users'
import classes from './App.module.css'

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
    return (
        <div>
            <Status />

            <nav className={classes.nav}>
                <ul>
                    <li>
                        <Link to="/login">Log in</Link>
                    </li>
                    <li>
                        <Link to="/">Users</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    )
}

export default App
