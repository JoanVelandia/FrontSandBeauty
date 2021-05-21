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
      this.currentUser = this.usersService.auth(nickName, password);

      if (this.usersService.auth(nickName, password) !== null) {
        this.usersService.setSession(this.currentUser);
        console.log('rol ' + this.currentUser.rol);
        if (this.currentUser.rol === "ROL_ADMIN") {
          this.setLoginAdmin();
        } else {
          this.setLoginClient();
        }
      } else {
        alert('usuario no registrado');
      }
    }
  }
  setLoginClient(): void {
    this.router.navigate(['/client/' + this.currentUser.nickName + '/lips']);
  }
  setLoginAdmin(): void {
    this.router.navigate(['/admin/' + this.currentUser.nickName]);
  }
}
