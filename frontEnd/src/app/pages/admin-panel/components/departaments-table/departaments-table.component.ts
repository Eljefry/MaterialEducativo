import { Component, OnInit, Input,OnChanges, SimpleChanges} from '@angular/core';
import { MaterialService } from 'src/app/services/service.service';
import { AlertService } from 'src/app/services/alertas/alert.service';


@Component({
  selector: 'app-departaments-table',
  templateUrl: './departaments-table.component.html',
  styleUrls: ['./departaments-table.component.css']
})
export class DepartamentsTableComponent implements OnInit,OnChanges {

  @Input() state: string = '';
  departaments: any;
  filteredDepartaments:any
  pagina = 1;

  constructor(private _materialService: MaterialService, private _alertService: AlertService) { }

  ngOnInit() {
    this.getDepartaments();
  }

  ngOnChanges(): void {
    if (this.state) {
      const filtroLowerCase = this.state.toLocaleLowerCase();
      this.filteredDepartaments = this.departaments.filter((depto: any) => {
        const nombreDepartamento = depto.nombre.toLocaleLowerCase();
        return nombreDepartamento.includes(filtroLowerCase)
      });
    } else {
      this.filteredDepartaments = this.departaments;
    }
  }

  getDepartaments() {
    this._materialService.getDepartaments().subscribe({
      next: (response) => { this.departaments = response; this.filteredDepartaments=response },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  async crearDepartamento() {

    const nombre = await this._alertService.form(
      "",
      "Departamento Nuevo",
      "Ingrese un nombre",
      "ingrese un nombre"
    );

    if (nombre) {
      const dataFolder = new FormData();
      dataFolder.append('nombre', nombre);;
      this._materialService.createDepartament(dataFolder).subscribe({
        next: (response) => { console.log(response); this._alertService.success("Depto Creado Exitosamente", " "); this.getDepartaments(); },
        error: () => this._alertService.error('Respuesta Fallida')
      })
    }
  }

  async editarDepartamento(id: string, name: string) {

    const nombre = await this._alertService.form(
      name,
      "Editar",
      "ingrese nombre nuevo",
      "ingrese un nombre nuevo"
    );

    if (nombre) {
      const dataFolder = new FormData();
      dataFolder.append('nombre', nombre);
      this._materialService.updateDepartament(id, dataFolder).subscribe({
        next: (response) => {
          console.log(response);
          this._alertService.success("Departamento editado exitosamente", " ");
          this.getDepartaments();
        },
        error: () => this._alertService.error('Respuesta Fallida')
      })
    }
  }

  async eliminarDepartamento(id: string, name: string) {
    const accion = 'eliminar';
    try {
      const result = await this._alertService.confirmed("¿Está seguro/a de " + accion + " el departamento " + name, "Esto es irreversible");
      if (result.isConfirmed) {
        this._materialService.deleteDepartament(id).subscribe({
          next: () => {
            this._alertService.success("¡Departamento eliminado!");
            this.ngOnInit();
          },
          error: (errorResponse) => {
            console.log(errorResponse);
            if (errorResponse.status === 400 && errorResponse.error.detail) {
              this._alertService.error(errorResponse.error.detail);
            } else {
              this._alertService.error('Respuesta fallida');
            }
          }
        });
      } else {
        this._alertService.error("La acción ha sido cancelada...", "Cancelado");
      }
    } catch (error) {
      this._alertService.error("Hubo un error en la confirmación");
    }
  }

}


