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
  user!: User;
  token!: string;

  constructor(
    private localStorage: LocalStorageService,
    private request: HttpClient
  ) {
    this.token = localStorage.getToken('authorization');
  }

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
    const URI = '/SandBeauty/api/client/name/' + user;
    const header = {
      headers: new HttpHeaders().set('Authorization', this.token),
    };
    return this.request.get<User>(URI, header);
  }

  logout(): void {
    /*this.localStorage.logOut();*/
  }
}
