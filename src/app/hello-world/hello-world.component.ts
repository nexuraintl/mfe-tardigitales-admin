import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hello-world',
  imports: [CommonModule, FormsModule],
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.css',
})
export class HelloWorld {
  nombre: string = '';
  contador: number = 0;
  
  saludos = [
    { lang: 'Español', text: '¡Hola, Mundo!', code: 'es' },
    { lang: 'English', text: 'Hello, World!', code: 'en' },
    { lang: 'Français', text: 'Bonjour, le Monde!', code: 'fr' },
    { lang: 'Deutsch', text: 'Hallo, Welt!', code: 'de' },
    { lang: 'Italiano', text: 'Ciao, Mondo!', code: 'it' }
  ];
  
  saludoActualIndex: number = 0;

  get saludoActual(): string {
    return this.saludos[this.saludoActualIndex].text;
  }

  cambiarSaludo(): void {
    this.saludoActualIndex = (this.saludoActualIndex + 1) % this.saludos.length;
  }

  incrementar(): void {
    this.contador++;
  }
}
