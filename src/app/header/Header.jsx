import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Image from '@patientpattern/coat/ui/Image';
import Navigation from '../navigation/Navigation';
import Hamburger from './Hamburger';
import logoUrl from './logo.jpg';
import css from './Header.module.scss';

const Header = ({isSidebarShowing, onHamburgerClick}) => (
    <header className={css.root}>
        <Link to="/">
            <Image src={logoUrl} alt="Go home" />
        </Link>
        <Navigation className={css.nav} />
        <div className={css.actions}>
            <Hamburger
                isSidebarShowing={isSidebarShowing}
                onClick={onHamburgerClick}
            />
        </div>
    </header>
);

Header.propTypes = {
    isSidebarShowing: PropTypes.bool,
    onHamburgerClick: PropTypes.func.isRequired,
};

export default Header;
