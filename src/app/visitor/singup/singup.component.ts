import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      const rol: boolean = this.loginForm.controls.rol.value;
      this.currentUser = new User(0, nickName, password, rol);
      this.usersService.setSession(this.currentUser);
      this.router.navigate(['/client/' + this.currentUser.nickName]);
    }
  }
}
