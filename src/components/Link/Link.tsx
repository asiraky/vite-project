import React from 'react'
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'

type LinkProps = {
    to: string
} & MuiLinkProps

export const Link: React.FC<LinkProps> = ({ children, to, ...rest }) => {
    return (
        <MuiLink to={to} component={LinkBehavior} color="#FFF" {...rest}>
            {children}
        </MuiLink>
    )
}

const LinkBehavior = React.forwardRef<any, RouterLinkProps>(
    ({ to, ...rest }, ref) => <RouterLink ref={ref} to={to} {...rest} />,
)
