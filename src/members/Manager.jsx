import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import Badge from '@patientpattern/coat/ui/Badge';
import {useMembersStore} from 'members/store';

const Manager = props => {
    const {id} = useParams();
    const getManagerById = useMembersStore(state => state.getManagerById);
    const {name, active} = getManagerById(Number(id));

    return (
        <div className="Manager">
            Manager {id} - {name}
            <Badge variant={active ? 'success' : 'error'}>
                {active ? 'Active' : 'Inactive'}
            </Badge>
        </div>
    );
};

Manager.propTypes = {};

Manager.defaultProps = {};

export default Manager;
