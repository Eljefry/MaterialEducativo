import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent {
  @Input() foldersData: any[] = [];
  @Input() documents: any[] = [];
}
