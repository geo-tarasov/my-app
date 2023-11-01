import {IUser} from "../../config/types";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}