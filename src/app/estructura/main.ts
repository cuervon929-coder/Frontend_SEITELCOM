
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Nav } from './nav/nav';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Header, Nav],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

  menuAbierto = false;

  alternarMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

}
