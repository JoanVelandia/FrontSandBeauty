import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../core/models/user/user.model';
import { LocalStorageService } from '../core/services/localStorage/local-storage.service';

@Component({
selector: 'app-admin',
templateUrl: './admin.component.html',
styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

constructor(
  private router: Router,
  private localStorage: LocalStorageService
) { }

ngOnInit(): void {
  const user: User = this.localStorage.getItem('CURRENT_USER') as User;
  const rou = '/admin/' + user.nickName + '/eyes';
  this.router.navigate([rou]);
}


}
