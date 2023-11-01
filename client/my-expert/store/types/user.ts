import {IUser} from "../../config/types";

export interface UserState {
  user: IUser | {[K in any] : never}, // IUser | empty {}
  isAuth: boolean,
}

export enum UserActionTypes {
  SET_USER = 'SET_USER',
  SET_AUTH = 'SET_AUTH',
}
interface SET_USER {
  type: UserActionTypes.SET_USER,
  payload: IUser | {[K in any] : never}, // IUser | empty {}
}
interface SET_AUTH {
  type: UserActionTypes.SET_AUTH,
  payload: boolean,
}

export type UserAction = SET_USER | SET_AUTH;