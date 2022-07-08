import {BrowserRouter, Outlet, Routes, Route, Navigate} from 'react-router-dom';
import CoatApp from '@patientpattern/coat/ui/App';
import Home from 'home';
import Sessions from 'sessions';
import Members from 'members';
import Director from 'members/Director';
import Manager from 'members/Manager';
import App from './App';

const Root = () => (
    <CoatApp>
        <BrowserRouter basename="/adora-trails-hoa">
            <App>
                <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route index element={<Navigate to="home" replace />} />
                        <Route path="home" element={<Home />} />
                        <Route path="sessions" element={<Sessions />} />
                        <Route path="members" element={<Outlet />}>
                            <Route index element={<Members />} />
                            <Route
                                path="directors/:id"
                                element={<Director />}
                            />
                            <Route path="managers/:id" element={<Manager />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </App>
        </BrowserRouter>
    </CoatApp>
);

export default Root;
