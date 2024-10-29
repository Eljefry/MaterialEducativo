import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertService } from 'src/app/services/alertas/alert.service';
import { MaterialService } from 'src/app/services/service.service';
@Component({
  selector: 'app-filter-principal',
  templateUrl: './filter-principal.component.html',
  styleUrls: ['./filter-principal.component.css']
})
export class FilterPrincipalComponent implements OnInit {

  //propiedades para los selects
  departamentos: any;
  carreras: any;
  materias: any;
  categorias: any;

  //filtros actuales....
  filters = {
    categoria: { id: '', nombre: '' },
    materia: { id: '', nombre: '' },
    carrera: { id: '', nombre: '' },
    departamento: { id: '', nombre: '' },
    lastFilter: { value: '' }
  };



  @Output() filterChanged = new EventEmitter<any>();
  constructor(
    private _materialService: MaterialService,
    private _alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getFilters();
  }

  //estos SETS son para el valor del select
  //setea el filtro actual con los valores de los argumentos
  //luego en cada caso menos en el setCategory, setea en cascada con valores vacios los demas filtros ya que en cada uno de ellos hay una precedencia...

  setDepto(id: string, nombre: string) {
    this.filters.departamento.id = id;
    this.filters.departamento.nombre = nombre;
    this.setCarrera('', '');
    
  }
  setCarrera(id: string, nombre: string) {
    this.filters.carrera.id = id;
    this.filters.carrera.nombre = nombre;
    this.setMateria('', '');
  }
  setMateria(id: string, nombre: string) {
    this.filters.materia.id = id;
    this.filters.materia.nombre = nombre;
    this.setCategory('', '');
  }
  setCategory(id: string, nombre: string) {
    this.filters.categoria.id = id;
    this.filters.categoria.nombre = nombre;
  }

  //estos set son para los valores de la lista del select
  setCarreras(nombre?: string | null) {
    // si hay un departamento vigente elegido no me elimines la lista de carreras
    if (this.filters.departamento.id==='') {
      this.carreras = nombre;
    }
    this.setMaterias(nombre) 
  }

  setMaterias(nombre?: string | null) {
    // si hay una carrera vigente elegida no me elimines la lista de materias
    if (this.filters.carrera.id==='') {
      this.materias = nombre;
    }
  }


  //recibo como argumento el ultimo filter realizado y se lo agrega al json 
  //se envia ese json a la pagina principal para que lo procese
  sendFilter(lastFilter: string) {

    this.filters.lastFilter.value = lastFilter;
    this.filters = { ...this.filters }; // Crear una nueva referencia para que se ejecute el ngOnChanges en la pag principal..
    this.filterChanged.emit(this.filters);

  }



  //al iniciar el componente solo nos traemos los departamentos y categorias...
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

  getCarreras(idDepto: number) {
    this._materialService.getCarreras(idDepto).subscribe({
      next: (response: any) => {
        this.carreras = response;
      },
      error: () => this._alertService.error("Respuesta fallida")
    });
  }

  getMaterias(idCarrera?: number) {
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



