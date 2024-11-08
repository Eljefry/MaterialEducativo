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
   this.getUser();
  }

 //metodo para cambiar la vista de como se ven los documents y folders
 toggleView(view: string): void {
  this.selectView = view; //cambia el botón activo
  this.isListView = (view === 'list');
}

getUser(){
  const userId = this.materialService.getUserIdToken()?.toString(); // Usa `toString()` con paréntesis
  if (userId) {
    this.getData(userId);
  } else {
    console.error("Error: No se pudo obtener el ID del usuario");
  }
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

resetData(){
  this.documents=[];
}

resetComponent(){//se ejecuta cuando se escucha un evento de reinicio del componente filters
  this.resetData();
  this.getUser();
}

onFiltersChanged(filters: any) {
  const section='favoritos';
  const filters_Section = { ...filters, section };
  this.applyFilters(filters_Section);
}

applyFilters(filters: any): void {
  this.resetData();
  this.materialService.getDocumentsFilters(filters).subscribe((data: any) => {
    this.documents = data;
    console.log('data=',this.documents);
  });
}
}
