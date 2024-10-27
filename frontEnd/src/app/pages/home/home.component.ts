import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Section:string='';
  filter: any;
  constructor() { }

  ngOnInit(): void { 
     //establecer una sección por defecto al cargar la página
     this.Section='miUnidad';
  }

  onFilterChanged(filter: any): void {
    this.filter = filter;
  }

  //metodo para actualizar la sección seleccionada
  selectChange(section: string) {
      this.Section = section;
    }

}
