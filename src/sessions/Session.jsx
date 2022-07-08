import {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from '@patientpattern/coat/ui/Badge';
import Table from '@patientpattern/coat/ui/Table';
import Text from '@patientpattern/coat/ui/Text';
import {useCommonStore} from 'common/store';
import Expand from 'common/table/Expand';
import {useMembersStore} from 'members/store';
import css from './Session.module.scss';

const RESULTS = {
    1: 'success',
    2: 'error',
    3: 'warning',
};

const Session = ({
    data: {attendees, absentees, management, minutes, notes, motions},
}) => {
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
            Cell: ({value}) => (
                <Badge variant={RESULTS[value]}>
                    {getResultById(value).name}
                </Badge>
            ),
        },
        {
            Header: '',
            accessor: 'expand',
            Cell: ({row}) => {
                if (row.original.result !== 3) {
                    return <Expand row={row} />;
                } else {
                    return null;
                }
            },
        },
        /* eslint-enable react/prop-types */
    ];
    const directors = attendees.map(item => getDirectorById(item));
    const absentDirectors = absentees.map(item => getDirectorById(item));
    const managers = management.map(item => getManagerById(item));
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
                    {managers.map(({id, name}, i) => (
                        <Fragment key={id}>
                            <Link to={`/members/managers/${id}`}>{name}</Link>
                            {i < managers.length - 1 ? ', ' : ''}
                        </Fragment>
                    ))}
                </Text>
                <Text>
                    <strong className={css.present}>
                        Board Members Present:
                    </strong>{' '}
                    {directors.map(({id, name}, i) => (
                        <Fragment key={id}>
                            <Link to={`/members/directors/${id}`}>{name}</Link>
                            {i < directors.length - 1 ? ', ' : ''}
                        </Fragment>
                    ))}
                </Text>
                <Text>
                    <strong className={css.absent}>
                        Board Members Absent:
                    </strong>{' '}
                    {absentDirectors.length > 0
                        ? absentDirectors.map(({id, name}, i) => (
                              <Fragment key={id}>
                                  <Link to={`/members/directors/${id}`}>
                                      {name}
                                  </Link>
                                  {i < absentDirectors.length - 1 ? ', ' : ''}
                              </Fragment>
                          ))
                        : 'None'}
                </Text>
                <Text>
                    <strong>Notes:</strong> {notes ? notes : 'N/A'}
                </Text>
                <Text>
                    <a href={minutes} target="_blank" rel="noreferrer">
                        View official session minutes
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
                            votes: {for: voteFor, against},
                        },
                    },
                }) => (
                    <tr className={css.votes}>
                        <td colSpan={colSpan}>
                            <Text as="span" size="xs" weight="medium">
                                Votes:
                            </Text>{' '}
                            {voteFor.map(dir => {
                                const {id, name} = getDirectorById(dir);

                                return (
                                    <Badge
                                        key={id}
                                        classNameRoot={css.badge}
                                        size="sm"
                                        variant="success"
                                    >
                                        {name}
                                    </Badge>
                                );
                            })}
                            {against.map(dir => {
                                const {id, name} = getDirectorById(dir);

                                return (
                                    <Badge
                                        key={id}
                                        classNameRoot={css.badge}
                                        size="sm"
                                        variant="error"
                                    >
                                        {name}
                                    </Badge>
                                );
                            })}
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
                }),
                result: PropTypes.number,
                notes: PropTypes.string,
            })
        ),
    }),
};

export default Session;
