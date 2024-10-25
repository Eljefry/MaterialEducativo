import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filter: any;
  constructor() { }

  ngOnInit(): void { }

  onFilterChanged(filter: any): void {
    this.filter = filter;
  }


}
