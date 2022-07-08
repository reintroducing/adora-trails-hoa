import {useState} from 'react';
import PropTypes from 'prop-types';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import css from './App.module.scss';

function App({children}) {
    const [isSidebarShowing, setIsSidebarShowing] = useState(false);
    const onSidebarToggle = () => {
        setIsSidebarShowing(showing => !showing);
    };

    return (
        <>
            <Sidebar
                isOpen={isSidebarShowing}
                onNavItemClick={onSidebarToggle}
            />
            <Header
                isSidebarShowing={isSidebarShowing}
                onHamburgerClick={onSidebarToggle}
            />
            <div className={css.content}>{children}</div>
        </>
    );
}

App.propTypes = {
    children: PropTypes.node.isRequired,
};

export default App;
