import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
    this.route.navigate(['visitor/lips']);
  }

}
