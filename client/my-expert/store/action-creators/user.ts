import {Dispatch} from "redux";
import {UserAction, UserActionTypes} from '../types/user'
import AuthService from "../../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {AxiosError} from "axios";

interface ErrorResponse {
  status: number;
  errors: any[];
}

const handleAuthErrors = (error: any, sourceFunc: string, setError: (value: string) => void) => {
  if (error.response) {
    const { status, data: { errors } } = error.response;
    switch (status) {
      case 400:
        setError(`Неверный логин или пароль`);
        break;
      case 429:
        setError(`Слишком много запросов, попробуйте позже`);
        break;
      // здесь можно добавить обработку других возможных ошибок
      default:
        setError(`Неизвестная ошибка`);
        break;
    }
    if (errors && errors.length > 0) {
      setError(errors.join(', '));
    }
  } else {
    setError(`Ошибка: ${error.message}`);
  }
};

export const login = (email: string, password: string, setError: (value: string) => void) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await AuthService.login(email, password);
      await AsyncStorage.setItem('token', response.data.accessToken);
      dispatch({type: UserActionTypes.SET_AUTH, payload: true});
      dispatch({type: UserActionTypes.SET_USER, payload: response.data.user});
    } catch (e) {
      handleAuthErrors(e, 'login', setError);
    }
  }
}

export const logout = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await AuthService.logout();
      await AsyncStorage.removeItem('token');
      dispatch({type: UserActionTypes.SET_AUTH, payload: false});
      dispatch({type: UserActionTypes.SET_USER, payload: {}});
    } catch (e) {
      console.log(e)
    }
  }
}





























