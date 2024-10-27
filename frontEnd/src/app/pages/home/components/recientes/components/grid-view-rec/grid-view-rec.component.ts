import { Component, Input } from '@angular/core';

interface Document {
  title: string;
  owner: string;
  updated_at: string;
}
@Component({
  selector: 'app-grid-view-rec',
  templateUrl: './grid-view-rec.component.html',
  styleUrls: ['./grid-view-rec.component.css']
})
export class GridViewRecComponent {
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
