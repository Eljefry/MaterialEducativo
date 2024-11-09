import { Component, OnInit, Input } from '@angular/core';
import { CarrerasDialogComponent } from './carreras-dialog/carreras-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialService } from 'src/app/services/service.service';
import { AlertService } from 'src/app/services/alertas/alert.service';

@Component({
  selector: 'app-carreras-table',
  templateUrl: './carreras-table.component.html',
  styleUrls: ['./carreras-table.component.css']
})
export class CarrerasTableComponent implements OnInit {
  @Input() state: string = '';
  carreras: any;
  carrera: any
  pagina = 1;

  constructor(public dialog: MatDialog, private _materialService: MaterialService, private _alertService: AlertService) { }

  ngOnInit() {
    this.getCarreras();
  }

  getCarreras() {
    this._materialService.getCarreras().subscribe({
      next: (response) => { this.carreras = response },
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
        carrera: this.carrera
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
      next: (response) => { console.log(response); this._alertService.success("¡Carrera Creada!");; this.getCarreras(); },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }
  updateCarrera(data: any) {
    this._materialService.updateCarrera(this.carrera.id, data).subscribe({
      next: (response) => { console.log(response); this._alertService.success("¡Carrera actualizada!");; this.getCarreras(); },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  async eliminarCarrera(id: string, name: string) {
    const accion = 'eliminar';
    try {
      const result = await this._alertService.confirmed("¿Está seguro/a de " + accion + " la materia " + name, "Esto es irreversible");
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
