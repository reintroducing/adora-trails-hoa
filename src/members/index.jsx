import PropTypes from 'prop-types';
import {Outlet} from 'react-router-dom';

const Members = props => {
    return (
        <div className="Members">
            <p>Members</p>
            <Outlet />
        </div>
    );
};

Members.propTypes = {};

Members.defaultProps = {};

export default Members;
