/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import config from './config';

const instance = axios.create({
  baseURL: config.api.url,
});

function AxiosErrorHandler(e: AxiosError) {
  if (e.response) return new Error(e.response.data.message);
  if (e.request) return new Error('generic/server-error');

  return new Error('generic/unknown-error');
}

export default {
  ...instance,
  get: async (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<any> => {
    try {
      return await instance.get(url, config);
    } catch (e) {
      throw AxiosErrorHandler(e);
    }
  },
  put: async (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<any> => {
    try {
      return await instance.put(url, data, config);
    } catch (e) {
      throw AxiosErrorHandler(e);
    }
  },
  post: async (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<any> => {
    try {
      return await instance.post(url, data, config);
    } catch (e) {
      throw AxiosErrorHandler(e);
    }
  },
  delete: async (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<any> => {
    try {
      return await instance.delete(url, config);
    } catch (e) {
      throw AxiosErrorHandler(e);
    }
  },
};
