import 'regenerator-runtime';
import {render} from 'react-dom';
import ErrorBoundary from '@patientpattern/coat/ui/ErrorBoundary';
import Root from 'app/Root';
import './index.module.scss';

render(
    <ErrorBoundary>
        <Root />
    </ErrorBoundary>,
    document.getElementById('root')
);
