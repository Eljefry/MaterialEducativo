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
  departamentos: any = null;
  selectedDepto: any = null;

  constructor(public dialogRef: MatDialogRef<CategoryTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _alertService: AlertService) { }

  ngOnInit() {
    this.inicializarProps();
  }

  // Función de comparación para `[compareWith]`  Angular usará esta función cada vez que necesite verificar si el valor de selectedDepto coincide con alguna opción en departamentos.
  compareDepartments(depto1: any, depto2: any) {
    return depto1 && depto2 ? depto1.id === depto2.id : depto1 === depto2;
  }

  inicializarProps() {
    if (this.data?.carrera) {
      this.setNombre(this.data.carrera.nombre);
      this.setSelectedDepto()
    }
    if (this.data?.departamentos) {
      this.setDepartamentos();
    }
  }

  setNombre(nombre: string) {
    this.nombre = nombre;
  }
  setSelectedDepto() {
    const departamento = { "id": this.data.carrera.departamento, "nombre": this.data.carrera.departamento_nombre }
    this.selectedDepto = departamento;
  }

  setDepartamentos() {
    this.departamentos = this.data.departamentos;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    console.log(this.selectedDepto)
    if (this.nombre && this.selectedDepto) {
      this.dialogRef.close({ nombre: this.nombre, selectedDepto: this.selectedDepto.id });
    } else {
      this._alertService.error('Por favor, completa todos los campos obligatorios.');
    }
  }

}
