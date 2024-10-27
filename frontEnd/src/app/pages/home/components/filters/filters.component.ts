import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-Filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class filtersComponent {
  filters = {
    fileType: '',
    creationDate: '',
    viewType: ''
  };

  // emite un evento cuando cambian los filtros
  @Output() filtersChanged = new EventEmitter<any>();

  // aviso al componentes padre cuando un filtro cambia
  onFilterChange() {
    this.filtersChanged.emit(this.filters);
  }
}
