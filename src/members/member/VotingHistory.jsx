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
    const [filters, setFilters] = useState(null);
    const [numActiveFilters, setNumActiveFilters] = useState(0);
    const [sessions, setSessions] = useState(getSessionsByYear(getYears()[0]));
    const [currentMotions, setCurrentMotions] = useState(
        getMemberMotions({id, sessions, filters})
    );
    const onYearChange = ({target: {value}}) => {
        const newSessions = getSessionsByYear(value);

        setSessions(newSessions);
        setCurrentMotions(
            getMemberMotions({id, sessions: newSessions, filters})
        );
    };
    const onFiltersClick = () => {
        filtersRef.current.toggle();
    };
    const onResetFilters = () => {
        setFilters(null);
        setNumActiveFilters(0);
        setCurrentMotions(getMemberMotions({id, sessions, filters: null}));
    };
    const onApplyFilters = newFilters => {
        setFilters(newFilters);
        setNumActiveFilters(Object.keys(newFilters).length);
        setCurrentMotions(
            getMemberMotions({id, sessions, filters: newFilters})
        );
    };

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
                        No voting history available. Try viewing a different
                        year or, if you&apos;ve applied filters,
                        adjusting/resetting them.
                    </Text>
                )}
            </div>
            <Filters
                ref={filtersRef}
                formValues={filters}
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
