import {http} from './http';
import {AxiosResponse} from 'axios';

export let mePromise: Promise<AxiosResponse<{
  resource: { id: number }
}>> | undefined;

export const refreshMe = () => {
  mePromise = http.get<{ resource: { id: number } }>('/me');
  return mePromise;
};

export const fetchMe = refreshMe;
