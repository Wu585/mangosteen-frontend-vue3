import {http} from './http';
import {AxiosResponse} from 'axios';

export let mePromise: Promise<AxiosResponse<Resource<User>>> | undefined;

export const refreshMe = () => {
  mePromise = http.get('/me');
  return mePromise;
};

export const fetchMe = refreshMe;
