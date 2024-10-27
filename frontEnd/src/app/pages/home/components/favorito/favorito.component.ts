import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/services/service.service'; 
@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.css']
})
export class FavoritoComponent implements OnInit {
  documents: any[] = []; 
  userId: string = '';  
  isListView: boolean = true; //por defecto en vista lista
  selectView: string = 'list'; //mantiene el botón activo
  constructor(private materialService: MaterialService) { }

  ngOnInit():void{
    const Id = this.materialService.getUserIdToken();
    if (Id) {
      this.userId = Id.toString();
      this.getData(this.userId);
    } else {
      console.error('No se pudo obtener el id del usuario.');
    }
  }

 //metodo para cambiar la vista de como se ven los documents y folders
 toggleView(view: string): void {
  this.selectView = view; //cambia el botón activo
  this.isListView = (view === 'list');
}


getData(userId: string): void {
  this.materialService.getFavoritesDocuments(userId).subscribe(
    (data: any) => {
      console.log('respuesta del backend:', data);
      this.documents = data;
      console.log('Documentos favoritos:', this.documents);
    },
    (error) => {
      console.error('Error al obtener documentos favoritos:', error);
    }
  );
}
}
