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

const Vote = ({id, date, title, description, result, categories, vote}) => {
    const results = useCommonStore(state => state.results);
    const getCategoryById = useCommonStore(state => state.getCategoryById);

    return (
        <div className={css.root}>
            <Text className={css.date} as="span" weight="semibold">
                {date.toLocaleDateString('en-US')}
            </Text>
            <div className={css.title}>
                <Text className={css[`result${result}`]}>{title}</Text>
                {description && (
                    <Text className={css.description} size="sm">
                        {description}
                    </Text>
                )}
                <div className={css.details}>
                    <Text size="xs">
                        <strong>Voted:</strong>{' '}
                        <Badge
                            classNameRoot={css.badge}
                            size="sm"
                            variant={
                                results.find(
                                    ({id: resultId}) => vote === resultId
                                ).variant
                            }
                        >
                            {VOTE_TYPES[vote]}
                        </Badge>
                    </Text>
                    <Text size="xs">
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
    vote: PropTypes.number.isRequired,
};

export default Vote;
