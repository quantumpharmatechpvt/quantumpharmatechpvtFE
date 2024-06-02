import axios, { AxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';

// https://github.com/nextauthjs/next-auth/discussions/3550#discussioncomment-4169244

const isProd = process.env.NODE_ENV === 'production';
/*
 * Gets the NEXT_PUBLIC_BASE_PATH from the command used to start this app.
 * If NEXT_PUBLIC_BASE_PATH is specified but it does not start with a "/"
 * then add it.
 */
export function getBasePath() {
  let basePath = '';
  if (isProd && process.env.NEXT_PUBLIC_BASE_PATH) {
    if (process.env.NEXT_PUBLIC_BASE_PATH.startsWith('/')) {
      basePath = process.env.NEXT_PUBLIC_BASE_PATH;
    } else {
      basePath = '/' + process.env.NEXT_PUBLIC_BASE_PATH;
    }
  }
  return basePath;
}

/**
 * Axios client to send all backend api calls through
 * baseUrl is set to application so next js redirects all api calls to external backend
 */
const axiosInstance = axios.create({
  baseURL: getBasePath() + '/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(async (request) => {
//   await setAccessTokenOnRequestAndAsAxiosDefaults(request);
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      signOut({
        callbackUrl: process.env.NEXT_PUBLIC_BASE_PATH
          ? `/${process.env.NEXT_PUBLIC_BASE_PATH}/login`
          : `/login`
      });
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as ApiClient };
