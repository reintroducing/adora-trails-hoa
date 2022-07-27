import {useLocation, useParams} from 'react-router-dom';
import IconUser01 from '@patientpattern/coat/icons/User01';
import Avatar from '@patientpattern/coat/ui/Avatar';
import Badge from '@patientpattern/coat/ui/Badge';
import Text from '@patientpattern/coat/ui/Text';
import {useCommonStore} from 'common/store';
import {useMembersStore} from 'members/store';
import VotingHistory from './VotingHistory';
import css from './Member.module.scss';

const Member = () => {
    const {id} = useParams();
    const {pathname} = useLocation();
    const isManager = pathname.includes('managers');
    const getDirectorById = useMembersStore(state => state.getDirectorById);
    const getManagerById = useMembersStore(state => state.getManagerById);
    const getCompanyById = useCommonStore(state => state.getCompanyById);
    const {firstName, lastName, email, title, image, company, active, bio} =
        isManager ? getManagerById(Number(id)) : getDirectorById(Number(id));

    return (
        <div className={css.root}>
            <div className={css.details}>
                <Avatar
                    classNameAvatar={css.avatar}
                    size="xxl"
                    {...(image && {
                        imageSrc: image,
                        imageAlt: `${firstName} ${lastName}`,
                    })}
                >
                    {!image && <IconUser01 />}
                </Avatar>
                <div className={css.info}>
                    <Text className={css.name} size="lg" weight="medium">
                        {firstName} {lastName}
                    </Text>
                    <Text className={css.title}>{title}</Text>
                    <Badge
                        classNameRoot={css.badge}
                        variant={active ? 'success' : 'error'}
                    >
                        {active ? 'Active' : 'Inactive'}
                    </Badge>
                    {(email || company) && (
                        <div className={css.extras}>
                            {email && (
                                <Text size="sm">
                                    <strong>Email:</strong>{' '}
                                    <a href={`mailto:${email}`}>{email}</a>
                                </Text>
                            )}
                            {company && (
                                <Text size="sm">
                                    <strong>Company:</strong>{' '}
                                    {getCompanyById(company).name}
                                </Text>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {bio && (
                <div
                    className={css.bio}
                    dangerouslySetInnerHTML={{__html: bio}}
                />
            )}
            {!isManager && <VotingHistory id={parseInt(id, 10)} />}
        </div>
    );
};

export default Member;
