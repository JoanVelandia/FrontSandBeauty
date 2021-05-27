import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/core/models/order/order.model';
import { Rol } from 'src/app/core/models/rol/rol.model';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from './../../core/models/user/user.model';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent implements OnInit {
  hide: boolean = Boolean();
  currentUser!: User;
  loginForm: FormGroup = this.fb.group({
    nickname: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    rol: [false],
  });

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegister(): void {
    if (!this.loginForm.valid) {
      return;
    } else {
      const nickName = this.loginForm.controls.nickname.value;
      const password = this.loginForm.controls.password.value;
      const orders: Order[] = [];
      const myRol: Rol = new Rol(1, 'CLIENT');
      const roles: Rol[] = [];
      roles.push(myRol);
      this.currentUser = new User(0, nickName, password, 'kr 9', orders, roles);
      this.usersService.register(this.currentUser).subscribe(() => {
        this.usersService.auth(nickName, password).subscribe(() => {
          this.usersService.getUserByName(nickName).subscribe(
            (userFound) => {
              console.log('usrFound: ');
              console.log(userFound);
              this.currentUser = userFound;
              this.usersService.setCurrentUser(this.currentUser);
              this.initLogin();
            },
            (error) => {
              console.error('error: ' + error);
            }
          );
        });
      });
    }
  }

  initLogin(): void {
    if (this.currentUser !== null) {
      this.usersService.setSession(this.currentUser);
      this.currentUser.roles.forEach((element) => {
        if (element.description === 'ADMIN') {
          this.setLogin('/admin/');
        } else if (element.description === 'CLIENT') {
          this.setLogin('/client/');
        }
      });
    } else {
      alert('unregister');
    }
  }
  setLogin(rol: string): void {
    this.router.navigate([rol + this.currentUser.nickname + '/lips']);
  }
}
