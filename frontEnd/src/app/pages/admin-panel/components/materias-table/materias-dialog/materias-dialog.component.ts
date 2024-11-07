import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryTableComponent } from '../../category-table/category-table.component';
import { MaterialService } from 'src/app/services/service.service';
import { AlertService } from 'src/app/services/alertas/alert.service';

@Component({
  selector: 'app-materias-dialog',
  templateUrl: './materias-dialog.component.html',
  styleUrls: ['./materias-dialog.component.css',]
})
export class MateriasDialogComponent implements OnInit {

  nombre: string = '';
  carreras: any;
  selectedCarreras: any;

  constructor(public dialogRef: MatDialogRef<CategoryTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _materialService: MaterialService,
    private _alertService: AlertService) { }

  ngOnInit(): void {
    this.inicializarProps();
    this.getCarreras();
  }

  inicializarProps() {
    // Inicializar `nombre` y `selectedCarreras` con los datos recibidos (en el caso de que se haya editado)
    if (this.data?.materia) {
      this.setNombre(this.data.materia.nombre);
      this.setSelectedCarreras(this.data.materia.carreras);
    }
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }
  setSelectedCarreras(carreras: any) {
    this.selectedCarreras = carreras;
  }

  getCarreras() {
    this._materialService.getCarreras().subscribe({
      next: (response) => { this.carreras = response; },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  updateSelectedCarreras() {
    // Esta función se llama cada vez que se selecciona un elemento en el mat-select
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    // Extrae solo los IDs de las carreras seleccionadas
    const selectedCarrerasIds = this.selectedCarreras.map((carrera: any) => carrera.id);
    this.dialogRef.close({ nombre: this.nombre, selectedCarreras: selectedCarrerasIds });
  }

}
