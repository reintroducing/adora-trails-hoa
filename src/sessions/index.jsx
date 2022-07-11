import {
    Outlet,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import Label from '@patientpattern/coat/ui/Label';
import Select from '@patientpattern/coat/ui/Select/unhooked';
import useMountEffect from '@patientpattern/utils/hooks/useMountEffect';
import {useSessionsStore} from 'sessions/store';
import css from './Sessions.module.scss';

const Sessions = () => {
    const navigate = useNavigate();
    const getYears = useSessionsStore(state => state.getYears);
    const {year = getYears()[0]} = useParams();
    const [searchParams] = useSearchParams();
    const onYearChange = ({target: {value}}) => {
        navigate(value);
    };

    useMountEffect(() => {
        const session = searchParams.get('session');

        navigate(
            {pathname: year, search: session ? `?session=${session}` : null},
            {replace: true}
        );
    });

    return (
        <div className={css.root}>
            <Select
                classNameRoot={css.yearSelect}
                label={
                    <Label classNameRoot={css.yearLabel}>Viewing Year:</Label>
                }
                items={getYears().map(i => ({
                    value: i,
                    label: i,
                }))}
                defaultValue={year}
                onChange={onYearChange}
            />
            <Outlet />
        </div>
    );
};

export default Sessions;
