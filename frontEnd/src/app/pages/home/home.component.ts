import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Section:string='';

  constructor(private materialService: MaterialService) { }

  ngOnInit() {
     //establecer una sección por defecto al cargar la página
     this.Section='miUnidad';
  }

  //metodo para actualizar la sección seleccionada
  selectChange(section: string) {
      this.Section = section;
    }

}
