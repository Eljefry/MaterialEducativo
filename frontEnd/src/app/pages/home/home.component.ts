import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Section:string='';
  filters: any;
  constructor() { }

  ngOnInit(): void { 
     //establecer una sección por defecto al cargar la página
     this.Section='paginaPrincipal';
  }

  onFilterChanged(filters: any): void {
    this.filters = filters;
  }

  //metodo para actualizar la sección seleccionada
  selectChange(section: string) {
      this.Section = section;
    }

}
