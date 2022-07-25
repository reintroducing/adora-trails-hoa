import PropTypes from 'prop-types';
import Badge from '@patientpattern/coat/ui/Badge';
import Text from '@patientpattern/coat/ui/Text';
import {useCommonStore} from 'common/store';
import css from './Vote.module.scss';

const VOTE_TYPES = {
    1: 'For',
    2: 'Against',
    3: 'Abstained',
};

const Vote = ({
    id,
    date,
    title,
    description,
    result,
    categories,
    votes: {for: votesFor, against, abstain},
}) => {
    const results = useCommonStore(state => state.results);
    const getCategoryById = useCommonStore(state => state.getCategoryById);
    const memberVote = against.includes(id) ? 2 : abstain.includes(id) ? 3 : 1;

    return (
        <div className={css.root}>
            <Text className={css.date} as="span" weight="semibold">
                {date.toLocaleDateString('en-US')}
            </Text>
            <div className={css.title}>
                <Text className={css[`result${result}`]}>{title}</Text>
                {description && (
                    <Text className={css.description}>{description}</Text>
                )}
                <div className={css.details}>
                    <Text size="sm">
                        <strong>Voted:</strong>{' '}
                        <Badge
                            classNameRoot={css.badge}
                            variant={
                                results.find(
                                    ({id: resultId}) => memberVote === resultId
                                ).variant
                            }
                        >
                            {VOTE_TYPES[memberVote]}
                        </Badge>
                    </Text>
                    <Text size="sm">
                        <strong>Categories:</strong>{' '}
                        {categories.map(
                            (catId, i) =>
                                `${getCategoryById(catId).name}${
                                    i < categories.length - 1 ? ', ' : ''
                                }`
                        )}
                    </Text>
                </div>
            </div>
        </div>
    );
};

Vote.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    result: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(PropTypes.number).isRequired,
    votes: PropTypes.shape({
        for: PropTypes.arrayOf(PropTypes.number),
        against: PropTypes.arrayOf(PropTypes.number),
        abstain: PropTypes.arrayOf(PropTypes.number),
    }).isRequired,
};

export default Vote;
