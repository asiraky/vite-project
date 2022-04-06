import React from 'react'

import { useQuery } from 'react-query'

import classes from './Users.module.css'

export type User = {
    email: string
}

function Users() {
    const { data } = useQuery<unknown, unknown, User[]>('users', () =>
        fetch('http://locahost:3000/users'),
    )
    return (
        <ul className={classes.userList}>
            {data?.map((user) => (
                <li>{user.email}</li>
            ))}
        </ul>
    )
}

export default Users
