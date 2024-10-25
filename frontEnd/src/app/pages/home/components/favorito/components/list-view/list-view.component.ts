import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-view-fav',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponentFav {
  @Input() documents: any[] = [];
}
