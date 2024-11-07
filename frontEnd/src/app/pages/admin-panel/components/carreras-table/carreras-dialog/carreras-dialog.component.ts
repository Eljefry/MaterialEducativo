import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryTableComponent } from '../../category-table/category-table.component';
import { MaterialService } from 'src/app/services/service.service';
import { AlertService } from 'src/app/services/alertas/alert.service';

@Component({
  selector: 'app-carreras-dialog',
  templateUrl: './carreras-dialog.component.html',
  styleUrls: ['./carreras-dialog.component.css']
})
export class CarrerasDialogComponent implements OnInit {
  nombre: string = '';
  departamentos: any;
  selectedDepto: any;

  constructor(public dialogRef: MatDialogRef<CategoryTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _materialService: MaterialService,
    private _alertService: AlertService) { }

  ngOnInit() {
    this.inicializarProps();
    this.getDepartamentos();
  }

  inicializarProps() {
    if (this.data?.materia) {
      this.setNombre(this.data.carrera.nombre);
      this.setSelectedDepto(this.data.carrera.departamento);
    }
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }
  setSelectedDepto(departamentos: any) {
    this.selectedDepto = departamentos;
  }

  getDepartamentos() {
    this._materialService.getDepartaments().subscribe({
      next: (response) => { this.departamentos = response; },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  updateSelectedDepto() {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    console.log("depto",this.selectedDepto.id);
    this.dialogRef.close({ nombre: this.nombre, selectedDepto: this.selectedDepto.id});
  }

}
