import Text from '@patientpattern/coat/ui/Text';
import {useMembersStore} from 'members/store';
import MemberItem from './MemberItem';
import css from './Members.module.scss';

const Members = () => {
    const getActiveDirectors = useMembersStore(
        state => state.getActiveDirectors
    );
    const getInactiveDirectors = useMembersStore(
        state => state.getInactiveDirectors
    );
    const getActiveManagers = useMembersStore(state => state.getActiveManagers);
    const getInactiveManagers = useMembersStore(
        state => state.getInactiveManagers
    );

    return (
        <div className={css.root}>
            <Text as="h1" group="display" weight="semibold">
                Current Board Members
            </Text>
            <Text>
                These are the currently active board members serving the Adora
                Trails HOA.
            </Text>
            <div className={css.members}>
                {getActiveDirectors().map(data => (
                    <MemberItem key={data.id} data={data} />
                ))}
            </div>
            <Text as="h1" group="display" weight="semibold">
                Past Board Members
            </Text>
            <Text>
                These are board members who served the Adora Trails HOA in the
                past.
            </Text>
            <div className={css.members}>
                {getInactiveDirectors().map(data => (
                    <MemberItem key={data.id} data={data} />
                ))}
            </div>
            <Text as="h1" group="display" weight="semibold">
                Current Management Members
            </Text>
            <Text>
                These are the currently active members of the management team
                serving the Adora Trails HOA.
            </Text>
            <div className={css.members}>
                {getActiveManagers().map(data => (
                    <MemberItem key={data.id} data={data} isManagement />
                ))}
            </div>
            <Text as="h1" group="display" weight="semibold">
                Past Management Members
            </Text>
            <Text>
                These are members of the management team who served the Adora
                Trails HOA in the past.
            </Text>
            <div className={css.members}>
                {getInactiveManagers().map(data => (
                    <MemberItem key={data.id} data={data} isManagement />
                ))}
            </div>
        </div>
    );
};

export default Members;
