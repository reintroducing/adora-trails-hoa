import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import Badge from '@patientpattern/coat/ui/Badge';
import {useMembersStore} from 'members/store';

const Director = props => {
    const {id} = useParams();
    const getDirectorById = useMembersStore(state => state.getDirectorById);
    const {name, active} = getDirectorById(Number(id));

    return (
        <div className="Director">
            Director {id} - {name}
            <Badge variant={active ? 'success' : 'error'}>
                {active ? 'Active' : 'Inactive'}
            </Badge>
        </div>
    );
};

Director.propTypes = {};

Director.defaultProps = {};

export default Director;
