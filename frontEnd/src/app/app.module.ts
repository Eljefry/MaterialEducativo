import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegistroComponent } from './pages/registro/registro.component'; 
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule} from 'ngx-pagination';

//componentes

import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { TopbarComponent } from './pages/admin-panel/components/topbar/topbar.component'; 
import { SidebarComponent } from './pages/admin-panel/components/sidebar/sidebar.component';
import { UsersTableComponent } from './pages/admin-panel/components/users-table/users-table.component'; 
import { DocumentsTableComponent } from './pages/admin-panel/components/documents-table/documents-table.component'; 
import { LoginComponent } from './pages/login/login.component';

//home
import { HomeComponent } from './pages/home/home.component'; 
import { PaginaPrincipalComponent } from './pages/home/components/pagina-principal/pagina-principal.component';
import { FilterPrincipalComponent } from './pages/home/components/filter-principal/filter-principal.component';
import { SidebarComponentHome } from './pages/home/components/sidebar/sidebar.component';
import { NavbarComponent } from './pages/home/components/navbar/navbar.component';
import { FavoritoComponent } from './pages/home/components/favorito/favorito.component';
import { RecientesComponent } from './pages/home/components/recientes/recientes.component';
import { MiUnidadComponent } from './pages/home/components/mi-unidad/mi-unidad.component';
import { ListViewComponent } from './pages/home/components/mi-unidad/components/list-view/list-view.component';
import { GridViewComponent } from './pages/home/components/mi-unidad/components/grid-view/grid-view.component';
import { FiltersComponent } from './pages/home/components/filters/filters.component';
import { ListViewComponentFav } from './pages/home/components/favorito/components/list-view/list-view.component';
import { GridViewComponentFav } from './pages/home/components/favorito/components/grid-view/grid-view.component';
import { ListViewRecComponent } from './pages/home/components/recientes/components/list-view-rec/list-view-rec.component';
import { GridViewRecComponent } from './pages/home/components/recientes/components/grid-view-rec/grid-view-rec.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { UserProfileModalComponent } from './pages/home/components/navbar/components/user-profile-modal/user-profile-modal.component';

//componentes angular material
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  
  declarations: [
    
    AppComponent,
    HomeComponent,
    RegistroComponent,
    AdminPanelComponent,
    TopbarComponent,
    SidebarComponent,
    UsersTableComponent,
    DocumentsTableComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponentHome,
    FilterPrincipalComponent,
    PaginaPrincipalComponent,
    MiUnidadComponent,
    FavoritoComponent,
    RecientesComponent,
    ListViewComponent,
    GridViewComponent,
    FiltersComponent,
    ListViewComponentFav,
    GridViewComponentFav,
    ListViewRecComponent,
    GridViewRecComponent,
    UserProfileModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
