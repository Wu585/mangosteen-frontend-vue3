import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';

type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

export class Http {
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });
  }

  // get
  get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
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
