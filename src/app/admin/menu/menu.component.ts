import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user.model';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private route: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  navigateFace(route: string): void
  {
    const rou = '/' + route;
    this.route.navigate([rou]);
  }

  navigateReports(): void{
    const user: User = this.localStorage.getItem('CURRENT_USER') as User;
    const rou = '/admin/' + user.nickName + '/reports';
    this.route.navigate([rou]);
  }

}
