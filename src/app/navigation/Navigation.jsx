import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {cnb} from 'cnbuilder';
import css from './Navigation.module.scss';

const Navigation = ({className, onItemClick}) => (
    <nav className={cnb(css.root, className)}>
        <NavLink
            className={({isActive}) => cnb(css.item, {[css.active]: isActive})}
            to="/home"
            onClick={onItemClick}
        >
            Home
        </NavLink>
        <NavLink
            className={({isActive}) => cnb(css.item, {[css.active]: isActive})}
            to="/sessions"
            onClick={onItemClick}
        >
            Sessions
        </NavLink>
        <NavLink
            className={({isActive}) => cnb(css.item, {[css.active]: isActive})}
            to="/members"
            onClick={onItemClick}
        >
            Members
        </NavLink>
    </nav>
);

Navigation.propTypes = {
    className: PropTypes.string,
    onItemClick: PropTypes.func,
};

export default Navigation;
