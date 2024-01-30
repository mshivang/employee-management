import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginParams,
  LoginUserResponse,
  RefreshTokenResponce,
  User,
  UserAddedResponse,
  UserBase,
  UserDeletedResponse,
  UserUpdatedResponse,
  UsersFetchedResponse,
} from '../../domain/entities';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  logoutUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  loginUser$(params: LoginParams): Observable<LoginUserResponse> {
    return this.http.post<LoginUserResponse>(
      'http://127.0.0.1:8000/dj-rest-auth/login/',
      params,
      {
        withCredentials: true,
      }
    );
  }

  fetchUsers$(): Observable<UsersFetchedResponse> {
    return this.http.get<UsersFetchedResponse>(
      'http://127.0.0.1:8000/api/users/',
      {
        withCredentials: true,
      }
    );
  }

  registerUser$(user: UserBase): Observable<UserAddedResponse> {
    return this.http.post<UserAddedResponse>(
      'http://127.0.0.1:8000/dj-rest-auth/registration/',
      user,
      {
        withCredentials: true,
      }
    );
  }

  deleteUser$(id: number): Observable<UserDeletedResponse> {
    return this.http.delete<UserDeletedResponse>(
      `http://127.0.0.1:8000/api/users/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  refreshToken$(): Observable<RefreshTokenResponce> {
    return this.http.post<RefreshTokenResponce>(
      `http://127.0.0.1:8000/dj-rest-auth/token/refresh/`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
