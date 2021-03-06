import {BrowserRouter, Outlet, Routes, Route, Navigate} from 'react-router-dom';
import CoatApp from '@patientpattern/coat/ui/App';
import Home from 'home';
import Sessions from 'sessions';
import SessionYear from 'sessions/SessionYear';
import Members from 'members';
import Member from 'members/member';
import App from './App';
import ScrollToTop from './ScrollToTop';

const Root = () => (
    <CoatApp>
        <BrowserRouter basename="/adora-trails-hoa">
            <ScrollToTop />
            <App>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route index element={<Navigate to="home" replace />} />
                        <Route path="home" element={<Home />} />
                        <Route path="sessions" element={<Sessions />}>
                            <Route path=":year" element={<SessionYear />} />
                        </Route>
                        <Route path="members" element={<Outlet />}>
                            <Route index element={<Members />} />
                            <Route path="directors/:id" element={<Member />} />
                            <Route path="managers/:id" element={<Member />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </App>
        </BrowserRouter>
    </CoatApp>
);

export default Root;
