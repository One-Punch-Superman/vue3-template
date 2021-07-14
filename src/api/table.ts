import request from '@/utils/request';
import axios from 'axios';

export function getList(params: any) {
    return request({
        url: '/vue-admin-template/table/list',
        method: 'get',
        params
    });
}

export function getMd() {
    return axios({
        url: '/about.md',
        method: 'get'
    });
}
