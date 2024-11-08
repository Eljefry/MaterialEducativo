import { Component, EventEmitter, Output, OnInit, HostListener } from '@angular/core';
import { MaterialService } from 'src/app/services/service.service';

@Component({
  selector: 'app-Filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filters = {
    fileType: '',
    category: '',
    modifiedDate: '',
    afterdate: '',
    beforedate: '',
  };
  categorias: any[] = [];
  types_extencion: any[] = [];
  isFileTypeOpen = false;
  isCategoryOpen = false;
  isModifiedDateOpen = false;
  showCustomDateInputs = false; // Controla la visibilidad de los inputs de fecha

  constructor(private materialService: MaterialService) {}

  @Output() filtersChanged = new EventEmitter<any>();
  @Output() filtersReset = new EventEmitter<void>();
  // Variable para controlar la visibilidad del selector de fechas personalizadas
  isCustomDateOpen = false;

  // Método para alternar la visibilidad del selector de fechas
  toggleCustomDatePicker() {
    this.isCustomDateOpen = !this.isCustomDateOpen;
  }

  ngOnInit(): void {
    this.getCategorias();
    this.getTypesDocs();
  }

  getCategorias(): void {
    this.materialService.getCategorias().subscribe((data: any) => {
      this.categorias = data;
    });
  }

  getTypesDocs(): void {
    this.materialService.getDocumentsTypes().subscribe((data: any) => {
      this.types_extencion = data;
    });
  }

  toggleDropdown(menu: string) {
    this.closeDropdown(); // Cierra cualquier menú abierto antes
    if (menu === 'fileType') {
      this.isFileTypeOpen = !this.isFileTypeOpen;
    } else if (menu === 'category') {
      this.isCategoryOpen = !this.isCategoryOpen;
    } else if (menu === 'modifiedDate') {
      this.isModifiedDateOpen = !this.isModifiedDateOpen;
    }
  }

  closeDropdown() {
    this.isFileTypeOpen = false;
    this.isCategoryOpen = false;
    this.isModifiedDateOpen = false;
    this.showCustomDateInputs = false; // Cierra los inputs personalizados
  }

  selectFileType(type: string) {
    this.filters.fileType = type;
    this.onFilterChange();
  }

  selectCategory(category: string) {
    this.filters.category = category;
    this.onFilterChange();
  }

  setDateRange(after: string, before: string) {
    this.filters.afterdate = after;
    this.filters.beforedate = before;
    this.onFilterChange();
  }

  selectModifiedDate(date: string) {
    if (date === 'personalizado') {
      this.showCustomDateInputs = true;
    } else {
      this.filters.modifiedDate=date;
      this.showCustomDateInputs = false;
    }
    this.onFilterChange();
  }

  applyCustomDateRange() {
    if (this.filters.afterdate && this.filters.beforedate) {
      console.log('se ingreso afterdate=',this.filters.afterdate);
      console.log('se ingreso beforedate=',this.filters.beforedate);
      this.onFilterChange();
      this.isCustomDateOpen = false;
    } else {
      alert("Por favor, ingresa ambas fechas.");
    }
  }

  onFilterChange() {
    this.filtersChanged.emit(this.filters);
    this.closeDropdown();
  }

  resetFilter(): void {
    this.filters = {
      fileType: '',
      category: '',
      modifiedDate: '',
      afterdate: '',
      beforedate: '',
    };
    this.closeDropdown();
  }
  isFilterApplied(): boolean {
    // Verifica si alguno de los filtros está activo
    return !!(this.filters.fileType || this.filters.category || this.filters.modifiedDate || this.filters.afterdate || this.filters.beforedate);
  }
  
  resetComponentFilters(): void {
    this.resetFilter();
    this.filtersReset.emit(); // Emite el evento para que el componente padre lo escuche
  }

  // Cierra los dropdowns cuando se hace clic fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideDropdown = target.closest('.dropdown');
    if (!isInsideDropdown) {
      this.closeDropdown();
    }
  }
}
