import { getToken } from '@/utils/auth';

export default {
    state: () => {
        return {
            token: getToken(),
            name: '',
            avatar: ''
        };
    },
    mutations: {},
    actions: {},
    namespaced: true
};
