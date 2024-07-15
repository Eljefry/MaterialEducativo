import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _Materialservice: MaterialService){}

  ngOnInit(): void {}

  Logout():void{
    this._Materialservice.logout();}

}
