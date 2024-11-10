import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MateriasDialogComponent } from './materias-dialog/materias-dialog.component';
import { MaterialService } from 'src/app/services/service.service';
import { AlertService } from 'src/app/services/alertas/alert.service';

@Component({
  selector: 'app-materias-table',
  templateUrl: './materias-table.component.html',
  styleUrls: ['./materias-table.component.css']
})
export class MateriasTableComponent implements OnInit, OnChanges {
  @Input() state: string = '';
  materias: any;
  filteredMaterias: any;
  materia: any
  pagina = 1;


  constructor(public dialog: MatDialog, private _materialService: MaterialService, private _alertService: AlertService) { }



  ngOnInit() {
    this.getMaterias();
  }


  ngOnChanges() {
    if (this.state) {
      const filtroLowerCase = this.state.toLocaleLowerCase();
      this.filteredMaterias = this.materias.filter((materia: any) => {
        const nombreMateria = materia.nombre.toLocaleLowerCase();
        return nombreMateria.includes(filtroLowerCase)
      });
    } else {
      this.filteredMaterias = this.materias;
    }

  }

  getMaterias() {
    this._materialService.getMaterias().subscribe({
      next: (response) => { this.materias = response; this.filteredMaterias = response },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  getMateria(id: string) {
    this._materialService.getMateria(id).subscribe({
      next: (response) => { this.materia = response; this.openDialogUpdate() },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(MateriasDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          "nombre": result.nombre,
          "carreras": result.selectedCarreras
        }
        this.crearMateria(data);
      }
    });
  }


  openDialogUpdate(): void {

    const dialogRef = this.dialog.open(MateriasDialogComponent, {
      width: '600px',
      data: {
        materia: this.materia
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          "nombre": result.nombre,
          "carreras": result.selectedCarreras
        }
        this.updateMateria(data);
      }
    });
  }

  crearMateria(data: any) {
    this._materialService.createMateria(data).subscribe({
      next: (response) => { console.log(response); this._alertService.success("¡Materia Creada!");; this.getMaterias(); },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }
  updateMateria(data: any) {
    this._materialService.updateMateria(this.materia.id, data).subscribe({
      next: (response) => { console.log(response); this._alertService.success("¡Materia actualizada!");; this.getMaterias(); },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  async eliminarMateria(id: string, name: string) {
    const accion = 'eliminar';
    try {
      const result = await this._alertService.confirmed("¿Está seguro/a de " + accion + " la materia " + name, "Esto es irreversible");
      if (result.isConfirmed) {
        this._materialService.deleteMateria(id).subscribe({
          next: () => {
            this._alertService.success("¡Materia eliminada!");
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
