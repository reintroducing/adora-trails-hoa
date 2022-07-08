import create from 'zustand';
import {devtools} from 'zustand/middleware';

const devTools = import.meta.env.DEV ? devtools : fn => fn;
const req = import.meta.globEager('./data/**/*.json');
const sessions = {};

Object.keys(req).forEach(key => {
    const [, , year] = key.split('/');

    if (!sessions[year]) {
        sessions[year] = [];
    }

    sessions[year].push(req[key].default);
});

const initialState = {
    sessions,
};

export const useSessionsStore = create(
    devTools((set, get) => ({
        ...initialState,
        getYears: () => Object.keys(get().sessions).reverse(),
        getSessionsByYear: year => get().sessions[year],
    }))
);
