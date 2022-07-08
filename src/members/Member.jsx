import {useLocation, useParams} from 'react-router-dom';
import Badge from '@patientpattern/coat/ui/Badge';
import {useMembersStore} from 'members/store';

const Member = () => {
    const {id} = useParams();
    const {pathname} = useLocation();
    const isManager = pathname.includes('managers');
    const getDirectorById = useMembersStore(state => state.getDirectorById);
    const getManagerById = useMembersStore(state => state.getManagerById);
    const {firstName, lastName, active} = isManager
        ? getManagerById(Number(id))
        : getDirectorById(Number(id));

    return (
        <div className="Member">
            {firstName} {lastName} is a manager? {isManager ? 'YES' : 'NO'}
            <Badge variant={active ? 'success' : 'error'}>
                {active ? 'Active' : 'Inactive'}
            </Badge>
        </div>
    );
};

export default Member;
