import { getToken } from '@/utils/auth';

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: ''
    };
};
const state = getDefaultState();
const mutations = {};
const actions = {
    login() {
        return '';
    },
    getInfo() {
        return '';
    },
    logout() {
        return '';
    },
    resetToken() {
        return '';
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
