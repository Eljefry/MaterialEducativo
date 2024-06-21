import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegistroComponent } from './components/registro/registro.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { TableComponent } from './components/table/table/table.component';
import { TopbarComponent } from './components/topbar/topbar/topbar.component';
import { AdminPanelComponent } from './components/admin-zone/admin-panel/admin-panel.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    SidebarComponent,
    TableComponent,
    TopbarComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
