import {useState} from 'react';
import Accordion from '@patientpattern/coat/ui/Accordion';
import Label from '@patientpattern/coat/ui/Label';
import Select from '@patientpattern/coat/ui/Select/unhooked';
import {useSessionsStore} from 'sessions/store';
import Session from './Session';
import css from './Sessions.module.scss';

function generateItems(sessions) {
    return sessions.map((session, i) => {
        const date = new Date(session.id);

        return {
            isOpen: i === 0,
            trigger: date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            content: <Session data={session} />,
        };
    });
}

const Sessions = () => {
    const getYears = useSessionsStore(state => state.getYears);
    const getSessionsByYear = useSessionsStore(
        state => state.getSessionsByYear
    );
    const [currentYear, setCurrentYear] = useState(getYears()[0]);
    const [items, setItems] = useState(() =>
        generateItems(getSessionsByYear(currentYear))
    );
    const onYearChange = ({target: {value}}) => {
        setItems(generateItems(getSessionsByYear(value)));
        setCurrentYear(value);
    };

    return (
        <div className={css.root}>
            <Select
                classNameRoot={css.yearSelect}
                label={<Label classNameRoot={css.yearLabel}>View Year:</Label>}
                items={getYears().map(year => ({
                    value: year,
                    label: year,
                }))}
                onChange={onYearChange}
            />
            <Accordion key={currentYear} items={items} />
        </div>
    );
};

export default Sessions;
