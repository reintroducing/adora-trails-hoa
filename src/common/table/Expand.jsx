import PropTypes from 'prop-types';
import IconArrowDown from '@patientpattern/coat/icons/ArrowDown';
import IconArrowUp from '@patientpattern/coat/icons/ArrowUp';
import IconButton from '@patientpattern/coat/ui/IconButton';

const Expand = ({row: {isExpanded, getToggleRowExpandedProps}}) => {
    const {onClick} = getToggleRowExpandedProps();
    const label = `${isExpanded ? 'Hide' : 'Show'} voting breakdown`;

    return (
        <IconButton
            variant="secondary"
            itemLabel={label}
            title={label}
            onClick={onClick}
        >
            {isExpanded ? <IconArrowUp /> : <IconArrowDown />}
        </IconButton>
    );
};

Expand.propTypes = {
    row: PropTypes.shape({
        isExpanded: PropTypes.bool,
        getToggleRowExpandedProps: PropTypes.func,
    }).isRequired,
};

export default Expand;
