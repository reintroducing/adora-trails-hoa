import Divider from '@patientpattern/coat/ui/Divider';
import Text from '@patientpattern/coat/ui/Text';
import css from './Home.module.scss';

const Home = () => {
    return (
        <div className={css.root}>
            <section className={css.textBlock}>
                <Text className={css.title} as="h1" weight="semibold">
                    Stay Connected
                </Text>
                <Text
                    className={css.subtitle}
                    as="h2"
                    group="display"
                    weight="semibold"
                >
                    The Adora Trails Community Association has its own website!
                </Text>
                <Text>
                    Homeowners have the ability to log onto{' '}
                    <a
                        href="https://www.AdoraTrailsCOA.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        www.AdoraTrailsCOA.com
                    </a>{' '}
                    to review their account balance, check their violation
                    history, download Association documents and forms, and stay
                    current of events and activities by viewing the community
                    calendar. You may also submit appeals, maintenance requests,
                    or general questions to community management.
                </Text>
            </section>
            <Divider spaceTop={64} spaceBottom={64} />
            <section className={css.hoaInfo}>
                <Text className={css.hoaBlock}>
                    <strong>Managed by Associated Asset Management</strong>
                    <br />
                    1600 W. Broadway Rd.
                    <br />
                    Suite 200
                    <br />
                    Tempe, AZ 85282
                    <br />
                    <br />
                    <strong>Community Manager</strong>
                    <br />
                    Rachel Dugall
                    <br />
                    <a href="mailto:rdugall@associatedasset.com">
                        rdugall@associatedasset.com
                    </a>
                    <br />
                    <br />
                    <strong>Phone:</strong>{' '}
                    <a href="tel:+6029579191">(602) 957-9191</a>
                    <br />
                    <strong>Fax:</strong>{' '}
                    <a href="tel:+8889592902">(888) 959-2902</a>
                    <br />
                    <strong>Toll-free:</strong>{' '}
                    <a href="tel:+8003540257">(800) 354-0257</a>
                    <br />
                    <strong>24-hour Emergency:</strong>{' '}
                    <a href="tel:+8665538290">(866) 553-8290</a>
                </Text>
                <Text className={css.hoaBlock}>
                    <strong>Community Center</strong>
                    <br />
                    Staff onsite to accept payments
                    <br />
                    <strong>Phone:</strong>{' '}
                    <a href="tel:+4802457607">(480) 245-7607</a>
                    <br />
                    <br />
                    <strong>Fitness Center Hours of Operation</strong>
                    <br />
                    5:00 a.m. - 9:00 p.m.
                    <br />
                    <small>
                        The gym, clubhouse, and pool are opened for Owners and
                        Residents seven days a week.
                    </small>
                    <br />
                    <br />
                    <a href="https://www.adoratrailscoa.com/">
                        Official HOA Website
                    </a>
                    <br />
                    <a href="https://facebook.com/OfficialAdoraTrails/">
                        Official Facebook Page
                    </a>
                    <br />
                    <a href="https://facebook.com/groups/AdoraTrailsEvents/">
                        Social Events Facebook Group
                    </a>
                    <br />
                </Text>
            </section>
        </div>
    );
};

export default Home;
