import { Component, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { UsersService } from '../core/services/users/users.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss'],
})
export class VisitorComponent implements OnInit {
  constructor(private router: Router, private userService: UsersService) {}

  ngOnInit(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const usr = urlTree.root.children[PRIMARY_OUTLET].segments[0].path;

    if (usr === 'visitor') {
      console.log('logout from visitor')
      this.userService.logout();
    }
    this.router.navigate(['visitor/lips']);
  }
}
