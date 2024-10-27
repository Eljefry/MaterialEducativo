import { Component, Input } from '@angular/core';

interface Document {
  title: string;
  owner: string;
  updated_at: string;
}
@Component({
  selector: 'app-list-view-rec',
  templateUrl: './list-view-rec.component.html',
  styleUrls: ['./list-view-rec.component.css']
})
export class ListViewRecComponent {
  @Input() groupedDocuments: {
    today: Document[];
    lastWeek: Document[];
    lastMonth: Document[];
    older: Document[];
  } = {
    today: [],
    lastWeek: [],
    lastMonth: [],
    older: []
  };

  constructor() {}
}
