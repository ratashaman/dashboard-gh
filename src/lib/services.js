import axios from "axios";
import { Logger } from "@/lib/logger";
import { getStorage } from "@/lib/storage";

/**
 * Log Responser
 *
 * @param {*} res
 * @returns
 */
export const logResponser = (res, isSuccess) => {
  if (!res) return;
  const { config } = res;
  const loadTime = performance.now();
  const url = config.url?.replace(process.env.NEXT_PUBLIC_API_URL || "", "");

  // * Send Response to logger
  Logger(`${config?.method?.toUpperCase()} ${url}`, {
    responseTime: loadTime,
    message: isSuccess ? res?.data?.message : res?.message || "",
  });
};

/**
 * Axios create default config
 */
const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost",
  headers: {
    Authorization: {
      toString() {
        return `Bearer ${getStorage("accessToken")}`;
      },
    },
  },
  timeout: 10000,
});

// Add a response interceptor to handle unauthorized errors
service.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV !== "production") logResponser(response, true);
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV !== "production") logResponser(error, false);
    return Promise.reject(error?.response?.data);
  }
);

/**
 * Func Get
 *
 * @param {String} url
 * @param {*} params
 */
export const get = async (url, params, headers) => {
  return await service.get(`${url}`, {
    params,
    headers,
  });
};

/**
 * Func Post / Put
 *
 * @param {String} url
 * @param {*} body
 */
export const post = async (url, body) => {
  return await service.post(`${url}`, body);
};

export const put = async (url, body) => {
  return await service.put(`${url}`, body);
};

/**
 * Func Delete
 *
 * @param {String} url
 * @param {*} params
 */
export const del = async (url, params) => {
  return await service.delete(`${url}`, {
    params,
  });
};
