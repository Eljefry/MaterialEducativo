import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MaterialService } from 'src/app/services/service.service'; 

@Component({
  selector: 'app-mi-unidad',
  templateUrl: './mi-unidad.component.html',
  styleUrls: ['./mi-unidad.component.css']
})
export class MiUnidadComponent implements OnInit {
  documents: any[] = [];  
  foldersData: any[] = []; 
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
    this.materialService.miUnidad(userId).subscribe({
      next: (data: any) => {
        this.documents = data.documents;
        this.foldersData = data.folders;
      },
      error: (error) => {
        console.error("Error al obtener datos:", error);
      }
    });
  }

  resetData(){
    this.documents=[];
    this.foldersData=[];
  }

  resetComponent(){//se ejecuta cuando se escucha un evento de reinicio del componente filters
    this.resetData();
    this.getUser();
  }
  
  //METODOS PARA EL FILTRADO
  onFiltersChanged(filters: any) {
    const section='general';
    const filters_Section = { ...filters, section };
    this.applyFilters(filters_Section);
  }

  applyFilters(filters: any): void {
    this.resetData();
    //forkJoin me permite ejecutar ambas solicitudes en paralelo
    forkJoin({
      documents: this.materialService.getDocumentsFilters(filters),
      folders: this.materialService.getFoldersFilters(filters)
    }).subscribe({
      next: (result) => {
        // Asigna los resultados una vez que ambas solicitudes han finalizado
        this.documents = result.documents;
        this.foldersData = result.folders;
      },
      error: (error) => {
        console.error('Error al aplicar filtros:', error);
      }
    });
  }
}






