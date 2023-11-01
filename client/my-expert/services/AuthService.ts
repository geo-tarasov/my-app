import $api from "../http";
import axios, {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    const res = await $api.post<AuthResponse>('/login', {email, password});
    await AsyncStorage.setItem('accessToken', res.data.accessToken);
    return res; // <AuthResponse> {email, password}
  }

  static async logout(): Promise<void> {
    return $api.post('/logout');
  }
}






























