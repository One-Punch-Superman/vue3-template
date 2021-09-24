import router from './router';
import store from './store';
import { ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done();
        } else {
            const hasGetUserInfo = store.getters.name;
            if (hasGetUserInfo) {
                next();
            } else {
                try {
                    await store.dispatch('user/getInfo');
                    next();
                } catch (error) {
                    await store.dispatch('user/resetToken');
                    ElMessage.error(error || 'Has Error');
                    next(`/login?redirect=${to.path}`);
                    NProgress.done();
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});
