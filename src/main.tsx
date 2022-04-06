import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import './index.css'
import App from './components/App'
import { AuthProvider } from './components/Auth'

const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
