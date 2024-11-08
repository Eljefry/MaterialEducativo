import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MaterialService } from 'src/app/services/service.service';

//defino una interfaz para los documentos, me lo pide javascript. Sirve para indicar que tipo de datos debe manejar el javascrit
interface Document {
  title: string;
  owner: string;
  updated_at: string;
}

@Component({
  selector: 'app-recientes',
  templateUrl: './recientes.component.html',
  styleUrls: ['./recientes.component.css']
})
export class RecientesComponent implements OnInit {
  documents: Document[] = [];  //defines de tipo de la interfaz document
  isListView: boolean = true; 
  selectView: string = 'list';

  groupedDocuments: {
    today: Document[];
    lastWeek: Document[];
    lastMonth: Document[];
    older: Document[];
  } = {
    today:[],
    lastWeek:[],
    lastMonth:[],
    older:[]
  };

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const userId = this.materialService.getUserIdToken()?.toString(); // Usa `toString()` con paréntesis
    if (userId) {
      this.getData(userId);
    } else {
      console.error("Error: No se pudo obtener el ID del usuario");
    }
  }

  //metodo para cambiar la vista de como se ven los documentos y carpetas
  toggleView(view: string): void {
    this.selectView = view; // Cambia el botón activo
    this.isListView = (view === 'list');
  }


  getData(userId: string): void {
    this.materialService.getDocumentsUser(userId).subscribe(
      (data:any) => {
        this.documents = data as Document[];  //digo que la data que recibo es del tipo interfaz document, asi lo agrego en las listas de groupedDocuments
        this.groupDocuments();  // agrupo los documentos por fecha
      }
    );
  }


 groupDocuments(): void {
  const today = this.setTimeToZero(new Date());//obtengo la fecha actual
  this.documents.forEach((doc: Document) => {
    const modifiedDate = this.setTimeToZero(new Date(doc.updated_at)); // Pone la hora en cero de la fecha del doc que se comparara
    if (this.isToday(today,modifiedDate)) {
      this.groupedDocuments.today.push(doc);
    } else if (this.LastWeek(modifiedDate)) {
      this.groupedDocuments.lastWeek.push(doc);
    } else if (this.LastMonth(modifiedDate)) {
      this.groupedDocuments.lastMonth.push(doc);
    } else {
      this.groupedDocuments.older.push(doc);
    }
  });
}
//establece la hora de un objeto date a 0
setTimeToZero(date: Date): Date {
  date.setHours(0, 0, 0, 0);
  return date;
}

isToday(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime();
}

LastWeek(date: Date): boolean {
  const today = this.setTimeToZero(new Date());
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);
  return date >= lastWeek && date < today;
}

LastMonth(date: Date): boolean {
  const today = this.setTimeToZero(new Date());
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);
  return date >= lastMonth && date < this.setTimeToZero(new Date(today.setDate(today.getDate() - 7)));
}


resetData(){
  this.documents=[];
  this.groupedDocuments = {
    today: [],
    lastWeek: [],
    lastMonth: [],
    older: []
  };
}

resetComponent(){
  this.resetData();
  this.getUser();
}

onFiltersChanged(filters: any) {
  const section='general';
  const filters_Section = { ...filters, section };
  this.applyFilters(filters_Section);
}

applyFilters(filters: any): void {
  this.resetData();
  this.materialService.getDocumentsFilters(filters).subscribe((data: any) => {
    this.documents = data;
    this.groupDocuments();
    console.log('data=',this.documents);
  });
}
}
