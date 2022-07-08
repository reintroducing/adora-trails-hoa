import sortBy from 'lodash/sortBy';
import create from 'zustand';
import {devtools} from 'zustand/middleware';
import directors from './data/directors';
import managers from './data/managers';

const devTools = import.meta.env.DEV ? devtools : fn => fn;
const initialState = {
    directors: sortBy(directors, ['lastName']),
    managers: sortBy(managers, ['lastName']),
};

export const useMembersStore = create(
    devTools((set, get) => ({
        ...initialState,
        getDirectorById: id => get().directors.find(item => item.id === id),
        getActiveDirectors: () => get().directors.filter(({active}) => active),
        getInactiveDirectors: () =>
            get().directors.filter(({active}) => !active),
        getManagerById: id => get().managers.find(item => item.id === id),
        getActiveManagers: () => get().managers.filter(({active}) => active),
        getInactiveManagers: () => get().managers.filter(({active}) => !active),
    }))
);
