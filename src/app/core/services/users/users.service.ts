import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Auth } from '../../models/auth/auth.model';
import { User } from '../../models/user/user.model';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user!: User;

  constructor(
    private localStorage: LocalStorageService,
    private request: HttpClient
  ) {}

  setSession(currentUser: User): void {
    this.localStorage.setSession(currentUser);
  }

  auth(user: string, password: string): User {
    
    this.request.post<any>('/SandBeauty/api/login', new Auth(user, password));
    return null;
  }

  loardUsers(): any {
    this.users = this.localStorage.getUsers();
  }

  logout(): void {
    this.localStorage.logOut();
  }
}
