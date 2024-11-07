import { Component, OnInit,Input } from '@angular/core';
import { MaterialService } from 'src/app/services/service.service';
import { AlertService } from 'src/app/services/alertas/alert.service';




@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css']
})
export class CategoryTableComponent implements OnInit {

  @Input() state: string = '';
  categories: any;
  pagina = 1;

  constructor(private _materialService: MaterialService, private _alertService: AlertService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this._materialService.getCategorias().subscribe({
      next: (response) => { this.categories = response; },
      error: () => this._alertService.error('Respuesta fallida')
    })
  }

  async crearCategoria() {

    const nombre = await this._alertService.form(
      "",
      "Categoria Nuevo",
      "Ingrese un nombre",
      "ingrese un nombre"
    );

    if (nombre) {
      const dataFolder = new FormData();
      dataFolder.append('nombre', nombre);;
      this._materialService.createCategoria(dataFolder).subscribe({
        next: (response) => { console.log(response); this._alertService.success("Categoria Creada Exitosamente", " "); this.getCategories(); },
        error: () => this._alertService.error('Respuesta Fallida')
      })
    }
  }

  async editarCategoria(id: string, name: string) {

    const nombre = await this._alertService.form(
      name,
      "Editar",
      "ingrese nombre nuevo",
      "ingrese un nombre nuevo"
    );

    if (nombre) {
      const dataFolder = new FormData();
      dataFolder.append('nombre', nombre);
      this._materialService.updateCategoria(id, dataFolder).subscribe({
        next: (response) => {
          console.log(response);
          this._alertService.success("Categoria editado exitosamente", " ");
          this.getCategories();
        },
        error: () => this._alertService.error('Respuesta Fallida')
      })
    }
  }

  async eliminarCategoria(id: string, name: string) {
    const accion = 'eliminar';
    try {
      const result = await this._alertService.confirmed("¿Está seguro/a de " + accion + " la categoria " + name, "Esto es irreversible");
      if (result.isConfirmed) {
        this._materialService.deleteCategoria(id).subscribe({
          next: () => {
            this._alertService.success("¡Categoria eliminado!");
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
