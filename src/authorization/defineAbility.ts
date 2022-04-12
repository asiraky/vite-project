import { AbilityBuilder, Ability } from '@casl/ability'

import { User } from '../components/Users/Users'

export default function defineAbilityFor(user: User) {
    const { can, build } = new AbilityBuilder(Ability)

    if (user.is_admin) {
        can('manage', 'User')
    }

    return build()
}
