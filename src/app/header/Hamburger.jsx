import {useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {cnb} from 'cnbuilder';
import css from './Hamburger.module.scss';

const Hamburger = ({isSidebarShowing, onClick}) => {
    const onEscapePress = useCallback(
        evt => {
            if (evt.key === 'Escape' && isSidebarShowing) {
                onClick();
            }
        },
        [isSidebarShowing, onClick]
    );

    useEffect(() => {
        document.addEventListener('keydown', onEscapePress);

        return () => {
            document.removeEventListener('keydown', onEscapePress);
        };
    }, [onEscapePress]);

    return (
        <button
            type="button"
            className={cnb(css.root, {[css.isActive]: isSidebarShowing})}
            onClick={onClick}
            aria-label="Toggle navigation menu"
            aria-expanded={isSidebarShowing ? 'true' : 'false'}
            aria-haspopup="true"
        >
            <span className={css.box}>
                <span className={css.inner} />
            </span>
        </button>
    );
};

Hamburger.propTypes = {
    isSidebarShowing: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default Hamburger;
