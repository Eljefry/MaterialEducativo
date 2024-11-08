import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.css']
})
export class UserProfileModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Input() User: any[] = [];

  // Métodos para manejar las acciones
  editProfile() {
    console.log('Editar perfil');
  }

  logout() {
    console.log('Cerrar sesión');
  }

  close() {
    this.closeModal.emit();
  }
}
