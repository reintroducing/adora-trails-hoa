import {useParams, useSearchParams} from 'react-router-dom';
import Accordion from '@patientpattern/coat/ui/Accordion';
import {useSessionsStore} from 'sessions/store';
import Session from './Session';

const SessionYear = () => {
    const {year} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const getSessionsByYear = useSessionsStore(
        state => state.getSessionsByYear
    );

    return (
        <Accordion
            key={year}
            items={getSessionsByYear(year).map((session, i) => ({
                isOpen: searchParams.get('session') === session.id,
                trigger: session.date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
                content: <Session data={session} />,
                onToggle: ({isExpanded}) => {
                    if (isExpanded) {
                        setSearchParams({session: session.id});
                    } else {
                        setSearchParams();
                    }
                },
            }))}
        />
    );
};

export default SessionYear;
