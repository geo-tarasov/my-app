import {UserAction, UserActionTypes, UserState} from "../types/user";


const initialState: UserState = {
  user: {},
  isAuth: false,
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {user: action.payload, isAuth: state.isAuth};
    case UserActionTypes.SET_AUTH:
      return {user: state.user, isAuth: action.payload};
    default:
      return state
  }
}

















