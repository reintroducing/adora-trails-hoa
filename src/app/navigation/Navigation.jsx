import PropTypes from 'prop-types';
import {NavLink, useLocation} from 'react-router-dom';
import {cnb} from 'cnbuilder';
import css from './Navigation.module.scss';

const Navigation = ({className, onItemClick}) => {
    const {pathname} = useLocation();
    const onSessionsClick = evt => {
        if (pathname.includes('sessions')) {
            evt.preventDefault();
        }

        if (onItemClick) {
            onItemClick();
        }
    };

    return (
        <nav className={cnb(css.root, className)}>
            <NavLink
                className={({isActive}) =>
                    cnb(css.item, {[css.active]: isActive})
                }
                to="/home"
                onClick={onItemClick}
            >
                Home
            </NavLink>
            <NavLink
                className={({isActive}) =>
                    cnb(css.item, {[css.active]: isActive})
                }
                to="/sessions"
                onClick={onSessionsClick}
            >
                Sessions
            </NavLink>
            <NavLink
                className={({isActive}) =>
                    cnb(css.item, {[css.active]: isActive})
                }
                to="/members"
                onClick={onItemClick}
            >
                Members
            </NavLink>
        </nav>
    );
};

Navigation.propTypes = {
    className: PropTypes.string,
    onItemClick: PropTypes.func,
};

export default Navigation;
