import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/service.service'; 

@Component({
  selector: 'app-mi-unidad',
  templateUrl: './mi-unidad.component.html',
  styleUrls: ['./mi-unidad.component.css']
})
export class MiUnidadComponent implements OnInit {
  documents: any[] = [];  
  foldersData: any[] = [];  
  userId: string = '';  
  isListView: boolean = true; //por defecto en vista lista
  selectView: string = 'list'; //mantiene el botón activo

  constructor(private materialService: MaterialService) { }

  ngOnInit():void{
    const Id = this.materialService.getUserIdToken(); //obtiene el id del usuario desde el token
    if (Id) {
      this.userId = Id.toString();  //asigna el ID del usuario
      this.getData(this.userId);//llamo al getData para que la info se cargue al instante
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }

  //metodo para cambiar la vista de como se ven los documents y folders
  toggleView(view: string): void {
    this.selectView = view; //cambia el botón activo
    this.isListView = (view === 'list');
  }

  getData(userId:string): void {
    this.materialService.miUnidad(this.userId).subscribe((data: any) => {
      this.documents = data.documents;
      this.foldersData = data.folders;
    });
  }
  
  //METODOS PARA EL FILTRADO
  onFiltersChanged(filters: any) {
    this.applyFilters(filters);
  }

  applyFilters(filters:string) {
   
    };
}






