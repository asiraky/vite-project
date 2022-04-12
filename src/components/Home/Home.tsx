import React from 'react'
import { Typography } from '@mui/material'

type HomeProps = {
    children?: React.ReactNode
}

export const Home: React.FC<HomeProps> = () => {
    return <Typography>Welcome home!</Typography>
}
