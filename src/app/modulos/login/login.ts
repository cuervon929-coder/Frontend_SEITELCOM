import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  mostrarPassword = false;
  
  constructor(private router: Router) {}

  iniciarSesion() {
    //Navegación de demostración.
    //Todavía no existe autenticación real.
    this.router.navigate(['/dashboard']);
  }
}
