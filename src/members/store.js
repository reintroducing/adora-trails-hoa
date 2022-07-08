import create from 'zustand';
import {devtools} from 'zustand/middleware';
import directors from './data/directors';
import managers from './data/managers';

const devTools = import.meta.env.DEV ? devtools : fn => fn;
const initialState = {
    directors,
    managers,
};

export const useMembersStore = create(
    devTools((set, get) => ({
        ...initialState,
        getDirectorById: id => get().directors.find(item => item.id === id),
        getManagerById: id => get().managers.find(item => item.id === id),
    }))
);
