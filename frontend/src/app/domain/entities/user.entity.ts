import { BaseResponse } from './base-response.entity';
import { Employee } from './employee.entity';

export interface UserBase {
  username: string;
  email: string;
  is_superuser: boolean;
}

export interface User extends UserBase {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrationParams {
  username: string;
  password1: string;
  password2: string;
  email: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginUserResponse extends BaseResponse {
  user: User;
  access: string;
}

export interface UsersFetchedResponse extends BaseResponse {
  users: User[];
}

export interface ProfileFetchedResponse extends BaseResponse {
  employee: Employee;
}

export interface UserAddedResponse extends BaseResponse {
  user: User;
}

export interface UserUpdatedResponse extends BaseResponse {
  user: User;
}

export interface UserDeletedResponse extends BaseResponse {}

export interface RefreshTokenResponce {
  access: string;
  access_expiration: string;
}
