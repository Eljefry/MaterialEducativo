import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertService } from 'src/app/services/alertas/alert.service';
import { MaterialService } from 'src/app/services/service.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  departamentos: any;
  carreras: any;
  materias: any;
  categorias: any;

  depto:string='';
  carrera:string='';
  materia:string='';
  category:string='';

  

  @Output() filterChanged = new EventEmitter<any>();
  constructor(
    private _materialService: MaterialService,
    private _alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getFilters();
  }

  setDepto(value:string) {
    this.depto=value;
    this.setCarrera('');
    this.setMateria('')
  }
  setCarrera(value:string) {
    this.carrera=value;
    this.setMateria('');
  }
  setMateria(value:string) {
    this.materia=value;
  }
  setCategory(value:string) {
    this.category=value;
  }


  getDocuments(id: number, value: string) {
    const filter: { id:number,value: string }  = {
      id:id,
      value:value
    }
    this.filterChanged.emit(filter);

  }

 

  getFilters() {
    this.getDepartaments();
    this.getCategorias();

  }

  getDepartaments() {
    this._materialService.getDepartaments().subscribe({
      next: (response: any) => {
        this.departamentos = response;
      },
      error: () => this._alertService.error("Respuesta fallida")
    });
  }

  getCarreras(idDepto ?:number) {
    this._materialService.getCarreras(idDepto).subscribe({
      next: (response: any) => {
        this.carreras = response;
      },
      error: () => this._alertService.error("Respuesta fallida")
    });
  }

  getMaterias(idCarrera?:number) {
    this._materialService.getMaterias(idCarrera).subscribe({
      next: (response: any) => {
        this.materias = response;
      },
      error: () => this._alertService.error("Respuesta fallida")
    });
  }

  getCategorias() {
    this._materialService.getCategorias().subscribe({
      next: (response: any) => {
        this.categorias = response;
      },
      error: () => this._alertService.error("Respuesta fallida")
    });
  }

}
