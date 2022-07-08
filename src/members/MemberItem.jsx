import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import IconUser01 from '@patientpattern/coat/icons/User01';
import Avatar from '@patientpattern/coat/ui/Avatar';
import Button from '@patientpattern/coat/ui/Button';
import Text from '@patientpattern/coat/ui/Text';
import css from './MemberItem.module.scss';

const MemberItem = ({
    data: {id, firstName, lastName, email, title, image},
    isManagement,
}) => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(`/members/${isManagement ? 'managers' : 'directors'}/${id}`);
    };

    return (
        <div className={css.root}>
            <Avatar classNameAvatar={css.avatar} size="xxl" onClick={onClick}>
                <IconUser01 />
            </Avatar>
            <Text className={css.name} size="lg" weight="medium">
                {firstName} {lastName}
            </Text>
            <Text className={css.title}>{title}</Text>
            <Button
                className={css.details}
                variant="primary"
                size="sm"
                onClick={onClick}
            >
                View Details
            </Button>
        </div>
    );
};

MemberItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
    }),
    isManagement: PropTypes.bool,
};

export default MemberItem;
