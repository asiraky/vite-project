import { useQuery } from 'react-query'

import classes from './Users.module.css'

export type User = {
    email: string
    first_name: string
    last_name: string
}

export const Users = () => {
    const { data } = useQuery<unknown, unknown, User[]>('users', () =>
        fetch('http://localhost:3000/users').then((res) => res.json()),
    )

    return (
        <ul className={classes.userList}>
            {data?.map((user) => (
                <li key={user.email}>{user.email}</li>
            ))}
        </ul>
    )
}
