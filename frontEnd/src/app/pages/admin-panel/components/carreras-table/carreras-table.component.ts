import { Component, OnInit, Input,OnChanges, SimpleChanges } from '@angular/core';
import { CarrerasDialogComponent } from './carreras-dialog/carreras-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialService } from 'src/app/services/service.service';
import { AlertService } from 'src/app/services/alertas/alert.service';

@Component({
  selector: 'app-carreras-table',
  templateUrl: './carreras-table.component.html',
  styleUrls: ['./carreras-table.component.css']
})
export class CarrerasTableComponent implements OnInit,OnChanges {
  @Input() state: string = '';
  departamentos:any;
  carreras: any;
  filteredCarreras:any;
  carrera: any
  pagina = 1;

  constructor(public dialog: MatDialog, private _materialService: MaterialService, private _alertService: AlertService) { }

  ngOnInit() {
    this.getCarreras();
    this.getDepartamentos();
  }

  ngOnChanges(): void {
    if (this.state) {
      const filtroLowerCase = this.state.toLocaleLowerCase();
      this.filteredCarreras = this.carreras.filter((carrera: any) => {
        const nombreCarrera = carrera.nombre.toLocaleLowerCase();
        return nombreCarrera.includes(filtroLowerCase)
      });
    } else {
      this.filteredCarreras = this.carreras;
    }
  }

  getDepartamentos() {
    this._materialService.getDepartaments().subscribe({
      next: (response) => { this.departamentos = response; },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  getCarreras() {
    this._materialService.getCarreras().subscribe({
      next: (response) => { this.carreras = response; this.filteredCarreras=response },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  getCarrera(id: string) {
    this._materialService.getCarrera(id).subscribe({
      next: (response) => { this.carrera = response;this.openDialogUpdate() },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CarrerasDialogComponent, {
      width: '600px',
      data:{
        departamentos: this.departamentos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          "nombre": result.nombre,
          "departamento": result.selectedDepto
        }
        this.crearCarrera(data);
      }
    });
  }


  openDialogUpdate(): void {

    const dialogRef = this.dialog.open(CarrerasDialogComponent, {
      width: '600px',
      data: {
        carrera: this.carrera,
        departamentos: this.departamentos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          "nombre": result.nombre,
          "departamento": result.selectedDepto
        }
        this.updateCarrera(data);
      }
    });
  }

  crearCarrera(data: any) {
    this._materialService.createCarrera(data).subscribe({
      next: (response) => { console.log(response); this._alertService.success("¡Carrera Creada!"); this.getCarreras(); },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }
  updateCarrera(data: any) {
    this._materialService.updateCarrera(this.carrera.id, data).subscribe({
      next: (response) => { console.log(response); this._alertService.success("¡Carrera actualizada!"); this.getCarreras(); },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  async eliminarCarrera(id: string, name: string) {
    const accion = 'eliminar';
    try {
      const result = await this._alertService.confirmed("¿Está seguro/a de " + accion + " la carrera " + name, "Esto es irreversible");
      if (result.isConfirmed) {
        this._materialService.deleteCarrera(id).subscribe({
          next: () => {
            this._alertService.success("¡Carrera eliminada!");
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
