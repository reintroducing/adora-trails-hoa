import create from 'zustand';
import {devtools} from 'zustand/middleware';

const devTools = import.meta.env.DEV ? devtools : fn => fn;
const initialState = {
    companies: [{id: 1, name: 'Associated Asset Management'}],
    categories: [
        {id: 1, name: 'Equipment'},
        {id: 2, name: 'Landscaping'},
        {id: 3, name: 'Construction'},
        {id: 4, name: 'Communication'},
        {id: 5, name: 'Design'},
    ],
    results: [
        {id: 1, name: 'Carried'},
        {id: 2, name: 'Failed'},
        {id: 3, name: 'Tabled'},
    ],
};

export const useCommonStore = create(
    devTools((set, get) => ({
        ...initialState,
        getCompanyById: id => get().companies.find(item => item.id === id),
        getCategoryById: id => get().categories.find(item => item.id === id),
        getResultById: id => get().results.find(item => item.id === id),
    }))
);
