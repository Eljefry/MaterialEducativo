import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialService } from 'src/app/services/service.service';
import { AlertService } from 'src/app/services/alertas/alert.service';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit, OnChanges {
  folders: any
  displayedColumns: string[] = ['nombre', 'creado', 'propietario'];
  documentSuggested: any;
  documentsFilter: any[] = [];
  documentsFilterRespaldo: any[] = [];
  @Input() filter: any = ''
  @ViewChild(MatSort) sort!: MatSort;
  departamento: boolean = false
  carrera: boolean = false
  materia: boolean = false

  constructor(private _Materialservice: MaterialService, private _alertService: AlertService) { }

  ngOnInit() {
    this.getUser();
  }

  ngOnChanges(): void {
    if (!this.filter) return;

    switch (this.filter.value) {
        case "departamento":
            this.getDocumentsDepartaments(this.filter.id);
            break;
        case "carrera":
            this.getDocumentsCarrera(this.filter.id);
            break;
        case "materia":
            this.getDocumentsMateria(this.filter.id);
            break;
        case "categoria":
            this.getDocumentsCategory(this.filter.id);
            break;
    }
}


  getUser() {
    this._Materialservice.getUser().then(usuario => {
      if (usuario) {
        this.getFolders(usuario.id);
        this.getDocuments(usuario.id);
      }
    }).catch(error => {
      console.error('Error al obtener el usuario', error);
    });
  }

  getFolders(idUser: string) {
    this._Materialservice.getFolders(idUser).subscribe({
      next: (response) => { console.log(response); this.folders = response; },
      error: () => this._alertService.error('Respuesta Fallida')
    })
  }

  getDocuments(idUser: string) {
    this._Materialservice.getSuggestedDocuments(idUser).subscribe({
      next: (response: any) => {
        console.log("documentos", response);
        this.documentSuggested = response;
      },
      error: () => this._alertService.error('Respuesta Fallida')
    });
  }

  getDocumentsDepartaments(id: string) {
    this._Materialservice.getDocumentsDepartaments(id).subscribe({
      next: (response: any) => {
        this.documentsFilter = response;
        this.documentsFilterRespaldo = this.documentsFilter;
        console.log(this.documentsFilter);
      },
      error: () => this._alertService.error('Respuesta Fallida')
    });
  }
  getDocumentsCarrera(id: string) {
    this._Materialservice.getDocumentsCarrera(id).subscribe({
      next: (response: any) => {
        this.documentsFilter = response;
        this.documentsFilterRespaldo = this.documentsFilter;
      },
      error: () => this._alertService.error('Respuesta Fallida')
    });
  }
  getDocumentsMateria(id: string) {
    this._Materialservice.getDocumentsMateria(id).subscribe({
      next: (response: any) => {
        this.documentsFilter = response;
        this.documentsFilterRespaldo = this.documentsFilter;
      },
      error: () => this._alertService.error('Respuesta Fallida')
    });
  }

  getDocumentsCategory(id: string) {

  //mejor ver que filters hay y en base a eso que el backend se encargue de filtar..............
    // Restaurar la copia de respaldo antes de aplicar el nuevo filtro

 
    this.documentsFilter = [...this.documentsFilterRespaldo];

    // Si ya hay algún filtro (departamento, carrera o materia), aplicar el filtro localmente
    if (this.departamento || this.carrera || this.materia) {
        this.documentsFilter = this.documentsFilter.filter((document: any) => document.categoria_id === id);
    } else {
        // Si no hay ningún filtro aplicado previamente, hacer una llamada al backend
        this._Materialservice.getDocumentsCategorys(id).subscribe({
            next: (response: any) => {
                this.documentsFilter = response;
                this.documentsFilterRespaldo = response; // Actualizar respaldo
            },
            error: () => this._alertService.error('Respuesta Fallida')
        });
    }
}

}
