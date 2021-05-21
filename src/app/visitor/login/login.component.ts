import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users.service';
import { User } from './../../core/models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = Boolean();
  currentUser!: User;
  loginForm: FormGroup = this.fb.group({
    nickname: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    if (!this.loginForm.valid) {
      return;
    } else {
      const nickName = this.loginForm.controls.nickname.value;
      const password = this.loginForm.controls.password.value;
      this.usersService.auth(nickName, password).subscribe(
        (usr) => {
          console.log('usr: ' + usr);
          this.usersService.getUserByName(nickName).subscribe(
            (userFound) => {
              console.log('usrFound: ' + userFound);
              this.currentUser = userFound;

              this.initLogin();


            },
            (error2) => {
              console.error('error2: ' + error2);
            }
          );
        },
        (error) => {
          console.error('error: ' + error);
        }
      );
    }
  }
  initLogin(): void {
    console.log('currentUser: ' + this.currentUser);

    if (this.currentUser !== null) {
      this.usersService.setSession(this.currentUser);
      this.currentUser.roles.forEach((element) => {
        if (element.description === 'ADMIN') {
          console.log('is admin');
        } else if (element.description === 'CLIENT') {
          console.log('is client');
        }
      });
    } else {
      alert('unregister');
    }
  }
  setLoginClient(): void {
    this.router.navigate(['/client/' + this.currentUser.nickname + '/lips']);
  }
  setLoginAdmin(): void {
    this.router.navigate(['/admin/' + this.currentUser.nickname]);
  }
}
