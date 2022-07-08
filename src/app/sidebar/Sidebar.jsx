import PropTypes from 'prop-types';
import {cnb} from 'cnbuilder';
import Navigation from '../navigation/Navigation';
import css from './Sidebar.module.scss';

const Sidebar = ({isOpen, onNavItemClick}) => (
    <section className={cnb(css.root, {[css.showing]: isOpen})}>
        <Navigation onItemClick={onNavItemClick} />
    </section>
);

Sidebar.propTypes = {
    isOpen: PropTypes.bool,
    onNavItemClick: PropTypes.func,
};

export default Sidebar;
