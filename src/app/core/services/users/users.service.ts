import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../../models/auth/auth.model';
import { User } from '../../models/user/user.model';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  currentUser!: User;

  constructor(
    private localStorage: LocalStorageService,
    private request: HttpClient
  ) {}

  setSession(currentUser: User): void {
    this.localStorage.setSession(currentUser);
  }

  auth(user: string, password: string): Observable<any> {
    return this.request.post<any>(
      '/SandBeauty/api/login',
      new Auth(user, password)
    );
  }

  getUserByName(user: string): Observable<User> {
    const URI = '/SandBeauty/api/user/client/name/' + user;
    return this.request.get<User>(URI);
  }

  logout(): void {
    this.localStorage.logOut();
  }

  setCurrentUser(currentUser: User): void {
    this.currentUser = currentUser;
  }
  isLogIn(): boolean {
    return this.localStorage.isLogIn();
  }
  getCurrentUser(): User {
    return this.currentUser;
  }
}
