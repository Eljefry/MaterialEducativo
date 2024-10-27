import { Component, OnInit } from '@angular/core';
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
  userId: string = '';  
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
    const Id = this.materialService.getUserIdToken(); 
    if (Id) {
      this.userId = Id.toString(); 
      this.getData(this.userId); 
    } else {
      console.error('No se pudo obtener el ID del usuario.');
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

  // metodo para agrupar los documentos por fecha
  groupDocuments(): void {
    const today = new Date(); //indica la fecha de hoy
    console.log(today);
    this.documents.forEach((doc: Document) => {
      const modifiedDate = new Date(doc.updated_at); //fecha de modificación del documento

      //compara si el doc fue modificado hoy, si es asi lo agrega ala lista today
      if (this.isToday(today, modifiedDate)) {
        this.groupedDocuments.today.push(doc);
      }
      //compara si el doc fue modificado la semana pasada, si es asi lo agrega ala lista lastweek
      else if (this.LastWeek(modifiedDate)) {
        this.groupedDocuments.lastWeek.push(doc);
      }
      //compara si el doc fue modificado el ultimo mes, si es asi lo agrega ala lista lastmoth
      else if (this.LastMonth(modifiedDate)) {
        this.groupedDocuments.lastMonth.push(doc);
      }
      //si es mas antiguo
      else {
        this.groupedDocuments.older.push(doc);
      }
    });
  }

  //compara si las dos fechas son el mismo día
  isToday(date1: Date, date2: Date): boolean {
    const date=new Date(date1).toISOString().split('T')[0];
    const Mdate=new Date(date2).toISOString().split('T')[0];
    return date === Mdate;
  }

  //verifica si la fecha está dentro de la ultima semana
  LastWeek(date: Date): boolean {
    const today = new Date();
    const lastWeek = new Date(today.setDate(today.getDate() - 7));
    return date >= lastWeek && !this.isToday(new Date(), date);
  }

  //verifica si la fecha está dentro del ultimo mes
  LastMonth(date: Date): boolean {
    const today = new Date();
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    return date >= lastMonth && !this.LastWeek(date);
  }
}
