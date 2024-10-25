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
  documentsFilter: any;
  @Input() filter: any
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _Materialservice: MaterialService, private _alertService: AlertService) { }

  ngOnInit() {
    this.getUser();
  }

  ngOnChanges(): void {
    console.log("valor de filter", this.filter);

    if (this.filter?.value === "departamento") {
      this.getDocumentsDepartaments(this.filter.id);
    }
    if (this.filter?.value === "carrera") {
      this.getDocumentsCarrera(this.filter.id);
    }
    if (this.filter?.value === "materia") {
      this.getDocumentsMateria(this.filter.id);
    }
    if (this.filter?.value === "categoria") {
      this.getDocumentsCategory(this.filter.id);
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
      },
      error: () => this._alertService.error('Respuesta Fallida')
    });
  }
  getDocumentsCarrera(id: string) {
    this._Materialservice.getDocumentsCarrera(id).subscribe({
      next: (response: any) => {
        this.documentsFilter = response;
      },
      error: () => this._alertService.error('Respuesta Fallida')
    });
  }
  getDocumentsMateria(id: string) {
    this._Materialservice.getDocumentsMateria(id).subscribe({
      next: (response: any) => {
        this.documentsFilter = response;
      },
      error: () => this._alertService.error('Respuesta Fallida')
    });
  }
  getDocumentsCategory(id: string) {
    this._Materialservice.getDocumentsCategorys(id).subscribe({
      next: (response: any) => {
        this.documentsFilter = response;
      },
      error: () => this._alertService.error('Respuesta Fallida')
    });
  }



}
