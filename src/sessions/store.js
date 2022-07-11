import orderBy from 'lodash/orderBy';
import create from 'zustand';
import {devtools} from 'zustand/middleware';

const devTools = import.meta.env.DEV ? devtools : fn => fn;
const req = import.meta.globEager('./data/**/*.json');
const sessions = {};

Object.keys(req).forEach(key => {
    const [, , year, file] = key.split('/');
    const id = file.replace('.json', '');

    if (!sessions[year]) {
        sessions[year] = [];
    }

    sessions[year].push({
        ...req[key].default,
        id,
        date: new Date(`${id}T00:00:00`),
    });
});

const initialState = {
    sessions,
};

export const useSessionsStore = create(
    devTools((set, get) => ({
        ...initialState,
        getYears: () => Object.keys(get().sessions).reverse(),
        getSessionsByYear: year =>
            orderBy(get().sessions[year], ['id'], ['desc']),
    }))
);
