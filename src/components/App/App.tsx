import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import Users from '../Users'

import classes from './App.module.css'

function App() {
    return (
        <Router>
            <div>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <Link to="/login">Log in</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/login">
                        <ProtectedRoute />
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App
