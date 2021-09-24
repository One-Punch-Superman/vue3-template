import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import store from '@/store';
import { getToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});

service.interceptors.request.use(
    (config) => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code !== 20000) {
            ElMessage({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            });
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                ElMessageBox.confirm(
                    'You have been logged out, you can cancel to stay on this page, or log in again',
                    'Confirm logout',
                    {
                        confirmButtonText: 'Re-Login',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                    }
                ).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload();
                    });
                });
            }
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    (error) => {
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
