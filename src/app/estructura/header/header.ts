import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  @Input() menuAbierto = false;
  @Output() cambiarMenu = new EventEmitter<void>();

  alternarMenu() {
    this.cambiarMenu.emit();
  }
}
