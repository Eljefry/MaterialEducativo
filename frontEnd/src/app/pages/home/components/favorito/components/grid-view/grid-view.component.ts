import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid-view-fav',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponentFav {
  @Input() documents: any[] = [];
}
