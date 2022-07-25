import {Fragment, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import IconFilterFunnel02 from '@patientpattern/coat/icons/FilterFunnel02';
import Button from '@patientpattern/coat/ui/Button';
import Divider from '@patientpattern/coat/ui/Divider';
import Label from '@patientpattern/coat/ui/Label';
import Select from '@patientpattern/coat/ui/Select/unhooked';
import Text from '@patientpattern/coat/ui/Text';
import {useSessionsStore} from 'sessions/store';
import {getMemberMotions} from './utils';
import Filters from './Filters';
import Vote from './Vote';
import css from './VotingHistory.module.scss';

const VotingHistory = ({id}) => {
    const filtersRef = useRef(null);
    const getYears = useSessionsStore(state => state.getYears);
    const getSessionsByYear = useSessionsStore(
        state => state.getSessionsByYear
    );
    const [currentMotions, setCurrentMotions] = useState(() => {
        const sessions = getSessionsByYear(getYears()[0]);

        return getMemberMotions(id, sessions);
    });
    const [filterFormValues, setFilterFormValues] = useState(null);
    const [numActiveFilters, setNumActiveFilters] = useState(0);
    const onYearChange = ({target: {value}}) => {
        const sessions = getSessionsByYear(value);

        setCurrentMotions(getMemberMotions(id, sessions));
    };
    const onFiltersClick = () => {
        filtersRef.current.toggle();
    };
    const onResetFilters = () => {
        setFilterFormValues(null);
        setNumActiveFilters(0);
    };
    const onApplyFilters = filters => {
        const defaultValues = {};
        const allFilters = [];

        console.log(filters);

        Object.keys(filters).forEach(key => {
            const value = filters[key];

            defaultValues[key] = value;
            allFilters.push({id: key, value});
        });

        setFilterFormValues(defaultValues);
        setNumActiveFilters(allFilters.length);
    };

    console.log(filterFormValues);
    console.log(numActiveFilters);

    return (
        <div className={css.root}>
            <Text as="h1" group="display" weight="semibold">
                Voting History
            </Text>
            <div className={css.controls}>
                <Select
                    classNameRoot={css.yearSelect}
                    label={
                        <Label classNameRoot={css.yearLabel}>
                            Viewing Year:
                        </Label>
                    }
                    items={getYears().map(i => ({
                        value: i,
                        label: i,
                    }))}
                    defaultValue={getYears()[0]}
                    onChange={onYearChange}
                />
                <Button
                    testAttr="filters"
                    variant="secondary"
                    icon={<IconFilterFunnel02 />}
                    onClick={onFiltersClick}
                >
                    Filters
                    {numActiveFilters > 0 && ` (${numActiveFilters})`}
                </Button>
            </div>
            <div className={css.votes}>
                {currentMotions.length ? (
                    currentMotions.map((item, i) => (
                        <Fragment key={i}>
                            <Vote id={id} {...item} />
                            {i !== currentMotions.length - 1 && (
                                <Divider spaceTop={16} spaceBottom={16} />
                            )}
                        </Fragment>
                    ))
                ) : (
                    <Text>
                        No voting history for this year. Try viewing a different
                        year.
                    </Text>
                )}
            </div>
            <Filters
                ref={filtersRef}
                formValues={filterFormValues}
                onReset={onResetFilters}
                onApply={onApplyFilters}
            />
        </div>
    );
};

VotingHistory.propTypes = {
    id: PropTypes.number.isRequired,
};

export default VotingHistory;
