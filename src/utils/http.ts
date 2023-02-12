import axios, {AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {
  mockItemCreate,
  mockItemIndex,
  mockItemIndexBalance, mockItemSummary,
  mockSession,
  mockTagIndex,
  mockTagShow
} from '../mock/mock';

export class Http {
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });
  }

  // get
  get<R = unknown>(url: string, query?: Record<string, string | number>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
    return this.instance.request<R>({...config, url: url, params: query, method: 'get'});
  }

  // create
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>) {
    return this.instance.request<R>({...config, url, data, method: 'post'});
  }

  // update
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data'>) {
    return this.instance.request<R>({...config, url, data, method: 'patch'});
  }

  // destroy
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params'>) {
    return this.instance.request<R>({...config, url: url, params: query, method: 'delete'});
  }
}

export const http = new Http('/api/v1');

http.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    (config.headers as AxiosHeaders).set('Authorization', `Bearer ${jwt}`);
  }
  return config;
});

const mock = (response: AxiosResponse) => {
  if (location.hostname !== 'localhost'
    && location.hostname !== '127.0.0.1'
    && location.hostname !== '192.168.3.57') {
    return false;
  }
  switch (response.config?.params?._mock) {
    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config);
      return true;
    case 'tagShow':
      [response.status, response.data] = mockTagShow(response.config);
      return true;
    case 'itemCreate':
      [response.status, response.data] = mockItemCreate(response.config);
      return true;
    case 'itemIndex':
      [response.status, response.data] = mockItemIndex(response.config);
      return true;
    case 'itemIndexBalance':
      [response.status, response.data] = mockItemIndexBalance(response.config);
      return true;
    case 'itemSummary':
      [response.status, response.data] = mockItemSummary(response.config);
      return true;
    case 'session':
      [response.status, response.data] = mockSession(response.config);
      return true;
  }
  return false;
};

http.instance.interceptors.response.use((response) => {
  mock(response);
  if (response.status >= 400) {
    throw {response};
  }
  return response;
}, error => {
  mock(error.response);
  if (error.response.status >= 400) {
    throw error;
  } else {
    return error.response;
  }
});

http.instance.interceptors.response.use((response) => {
  return response;
}, error => {
  // 通用错误这里处理，业务错误外面的catch里处理
  if (error.response) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 429) {
      alert('你太频繁了');
    } else if (axiosError.response?.status === 500) {
      alert('服务器繁忙');
    }
  }
  // 如果不抛出错误，那么外面调用时catch不到错误，就不会走到catch里面
  return Promise.reject(error);
});
