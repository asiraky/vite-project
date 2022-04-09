import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

import { useAuth } from './'

type StatusProps = {
    children?: React.ReactNode
}

export const Status: React.FC<StatusProps> = ({}) => {
    const auth = useAuth()
    const navigate = useNavigate()

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    )

    if (!auth.accessToken) {
        return null
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = async () => {
        await auth.logout()
        setAnchorElUser(null)
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton
                    size="large"
                    onClick={handleOpenUserMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                        onClick={async () => {
                            await auth.logout()
                            navigate('/')
                        }}
                        textAlign="center"
                    >
                        Logout
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}
