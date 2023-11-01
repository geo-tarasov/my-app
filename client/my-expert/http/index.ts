import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthResponse} from "../models/response/AuthResponse";
import {store, useAppDispatch} from "../store";
import {logout} from "../store/action-creators/user";

export const API_URL = 'http://111.111.1.11:1111/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  console.log('Выполнен запрос');
  config.headers.Authorization = `Bearer ${token === null ? '' : token}`
  return config;
})

$api.interceptors.response.use(async (config) => {
  return config;
}, async (error) => {
  if (error.response.status == 401) {
    const originalRequest = error.config;
    if (error.config && !error.config.isRetry) {
      try {
        const myConfig = { isRetry: true };
        const response = await $api.get<AuthResponse>('/refresh', {...myConfig, withCredentials: true});
        await AsyncStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    store.dispatch(logout());
  }
  throw error;
})

export default $api;





























