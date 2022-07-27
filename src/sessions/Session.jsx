import {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import IconInfoCircle from '@patientpattern/coat/icons/InfoCircle';
import Badge from '@patientpattern/coat/ui/Badge';
import Table from '@patientpattern/coat/ui/Table';
import Tooltip from '@patientpattern/coat/ui/Tooltip';
import Text from '@patientpattern/coat/ui/Text';
import {useCommonStore} from 'common/store';
// import Expand from 'common/table/Expand';
import {useMembersStore} from 'members/store';
import css from './Session.module.scss';

const Session = ({
    data: {attendees, absentees, management, minutes, notes, motions},
}) => {
    const results = useCommonStore(state => state.results);
    const getCategoryById = useCommonStore(state => state.getCategoryById);
    const getResultById = useCommonStore(state => state.getResultById);
    const getDirectorById = useMembersStore(state => state.getDirectorById);
    const getManagerById = useMembersStore(state => state.getManagerById);
    const columns = [
        /* eslint-disable react/prop-types */
        {Header: 'Motion', accessor: 'title'},
        {Header: 'Details', accessor: 'description'},
        {
            Header: 'Categories',
            accessor: 'categories',
            Cell: ({value}) =>
                value.map(
                    (id, i) =>
                        `${getCategoryById(id).name}${
                            i < value.length - 1 ? ', ' : ''
                        }`
                ),
        },
        {
            Header: 'Result',
            accessor: 'result',
            Cell: ({
                value,
                row: {
                    original: {notes: resultNotes},
                },
            }) => (
                <span className={css.resultBadge}>
                    <Badge
                        variant={results.find(({id}) => value === id).variant}
                    >
                        {getResultById(value).name}
                    </Badge>
                    {resultNotes && (
                        <Tooltip
                            classNameTrigger={css.trigger}
                            classNameContent={css.content}
                            content={resultNotes}
                        >
                            <IconInfoCircle className={css.icon} />
                        </Tooltip>
                    )}
                </span>
            ),
        },
        // {
        //     Header: '',
        //     accessor: 'expand',
        //     Cell: ({row}) => {
        //         if (row.original.result !== 3) {
        //             return <Expand row={row} />;
        //         } else {
        //             return null;
        //         }
        //     },
        // },
        /* eslint-enable react/prop-types */
    ];
    const directors = attendees.map(item => getDirectorById(item));
    const absentDirectors = absentees.map(item => getDirectorById(item));
    const managers = management.map(item => getManagerById(item));
    const renderVotes = (votes, variant) => {
        const voters = votes.map(dir => {
            const {id, firstName, lastName} = getDirectorById(dir);

            return {id, firstName, lastName};
        });

        return sortBy(voters, ['lastName']).map(({id, firstName, lastName}) => {
            const name = `${firstName} ${lastName}`;
            let suffix = 'voted for';

            if (variant === 'error') {
                suffix = 'voted against';
            } else if (variant === 'warning') {
                suffix = 'abstained';
            }

            return (
                <Badge
                    key={id}
                    classNameRoot={css.voterBadge}
                    size="sm"
                    variant={variant}
                    title={`${name} ${suffix}`}
                >
                    {name}
                </Badge>
            );
        });
    };
    const expanded = {};

    motions.forEach((item, i) => {
        if (item.result !== 3) {
            expanded[i] = true;
        }
    });

    return (
        <div className={css.root}>
            <div className={css.info}>
                <Text>
                    <strong className={css.present}>Management Present:</strong>{' '}
                    {sortBy(managers, ['lastName']).map(
                        ({id, firstName, lastName}, i) => (
                            <Fragment key={id}>
                                <Link to={`/members/managers/${id}`}>
                                    {firstName} {lastName}
                                </Link>
                                {i < managers.length - 1 ? ', ' : ''}
                            </Fragment>
                        )
                    )}
                </Text>
                <Text>
                    <strong className={css.present}>
                        Board Members Present:
                    </strong>{' '}
                    {sortBy(directors, ['lastName']).map(
                        ({id, firstName, lastName}, i) => (
                            <Fragment key={id}>
                                <Link to={`/members/directors/${id}`}>
                                    {firstName} {lastName}
                                </Link>
                                {i < directors.length - 1 ? ', ' : ''}
                            </Fragment>
                        )
                    )}
                </Text>
                <Text>
                    <strong className={css.absent}>
                        Board Members Absent:
                    </strong>{' '}
                    {absentDirectors.length > 0
                        ? sortBy(absentDirectors, ['lastName']).map(
                              ({id, firstName, lastName}, i) => (
                                  <Fragment key={id}>
                                      <Link to={`/members/directors/${id}`}>
                                          {firstName} {lastName}
                                      </Link>
                                      {i < absentDirectors.length - 1
                                          ? ', '
                                          : ''}
                                  </Fragment>
                              )
                          )
                        : 'None'}
                </Text>
                <Text>
                    <strong>Notes:</strong> {notes ? notes : 'N/A'}
                </Text>
                <Text>
                    <a href={minutes} target="_blank" rel="noreferrer">
                        View session minutes
                    </a>
                </Text>
            </div>
            <Table
                columns={columns}
                data={motions}
                highlightOnHover
                initialState={{
                    expanded,
                }}
                renderRowSubComponent={({
                    colSpan,
                    row: {
                        original: {
                            votes: {for: voteFor, against, abstain},
                        },
                    },
                }) => (
                    <tr className={css.votes}>
                        <td colSpan={colSpan}>
                            <Text as="span" size="xs" weight="medium">
                                Votes:
                            </Text>{' '}
                            {renderVotes(voteFor, 'success')}
                            {renderVotes(against, 'error')}
                            {renderVotes(abstain, 'warning')}
                        </td>
                    </tr>
                )}
            />
        </div>
    );
};

Session.propTypes = {
    data: PropTypes.shape({
        attendees: PropTypes.arrayOf(PropTypes.number),
        absentees: PropTypes.arrayOf(PropTypes.number),
        management: PropTypes.arrayOf(PropTypes.number),
        minutes: PropTypes.string,
        notes: PropTypes.node,
        motions: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                title: PropTypes.string,
                description: PropTypes.string,
                categories: PropTypes.arrayOf(PropTypes.number),
                votes: PropTypes.shape({
                    for: PropTypes.arrayOf(PropTypes.number),
                    against: PropTypes.arrayOf(PropTypes.number),
                    abstain: PropTypes.arrayOf(PropTypes.number),
                }),
                result: PropTypes.number,
                notes: PropTypes.string,
            })
        ),
    }),
};

export default Session;
