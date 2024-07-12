import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建实例
const instance = axios.create({
  baseURL: '/',
  timeout: 5000
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response.status;
    let message = '';
    switch (status) {
      case 401:
        message = 'TOKEN过期';
        break;
      case 403:
        message = '无权访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器异常';
        break;
      default:
        message = '网络异常';
        break;
    }
    ElMessage({
      type: 'error',
      message
    });
    return Promise.reject(error);
  }
);

export function get(url: string, params?: any) {
  return instance.get(url, { params });
}

export function post(url: string, data?: any) {
  return instance.post(url, data);
}

export function put(url: string, data?: any) {
  return instance.put(url, data);
}
export function del(url: string, data?: any) {
  return instance.delete(url, data);
}

export function upload(url: string, file: any) {
  return instance.post(url, file, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export function download(url: string) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  iframe.onload = function () {
    document.body.removeChild(iframe);
  };
  document.body.appendChild(iframe);
}
