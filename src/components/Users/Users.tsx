import { Can } from '@casl/react'
import { useQuery } from 'react-query'
import { Alert, Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { useAuth } from '../Auth'
import ability from '../../authorization/defineAbility'

export type User = {
    id: string
    email: string
    first_name: string
    last_name: string
    is_admin: boolean
}

export const Users = () => {
    const auth = useAuth()

    if (!auth.user) return null

    return (
        <Can I="manage" this="User" ability={ability(auth.user)}>
            <_Users />
        </Can>
    )
}

const _Users = () => {
    const auth = useAuth()

    const { error, data } = useQuery<unknown, Error, User[]>('users', () =>
        fetch('http://localhost:3000/users', {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        }),
    )

    if (error) {
        return <Alert severity="error">{error.message}</Alert>
    }

    if (!data) {
        return <Alert severity="info">Loading data</Alert>
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 150,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
        },
        {
            field: 'first_name',
            headerName: 'First name',
        },
        {
            field: 'last_name',
            headerName: 'Last name',
        },
    ]

    return (
        <Box height={500}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    )
}
