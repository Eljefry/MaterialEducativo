// navbar.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { MaterialService } from 'src/app/services/service.service';
@Component({
  selector: 'app-navbar-h',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserProfileOpen = false;
  User: any[] = [];

  constructor(private _Materialservice: MaterialService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._Materialservice.getUser().then(usuario => {
      if (usuario) {
        this.User=usuario;
      }
    }).catch(error => {
      console.error('Error al obtener el usuario', error);
    });
  }

  toggleUserProfile() {
    this.isUserProfileOpen = !this.isUserProfileOpen;
  }
}
