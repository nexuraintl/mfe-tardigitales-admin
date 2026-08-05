import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  sidebarCollapsed = false;
  sidebarOpen = false;

  // Controladores de Dropdowns
  appsMenuOpen = false;
  settingsMenuOpen = false;
  profileMenuOpen = false;

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebarOpen = !this.sidebarOpen;
    
    if (this.sidebarCollapsed) {
      document.body.classList.add('nx-sidebar-collapsed');
    } else {
      document.body.classList.remove('nx-sidebar-collapsed');
    }

    if (this.sidebarOpen) {
      document.body.classList.add('nx-sidebar-open');
    } else {
      document.body.classList.remove('nx-sidebar-open');
    }
  }

  toggleDropdown(menu: 'apps' | 'settings' | 'profile'): void {
    if (menu === 'apps') {
      this.appsMenuOpen = !this.appsMenuOpen;
      this.settingsMenuOpen = false;
      this.profileMenuOpen = false;
    } else if (menu === 'settings') {
      this.settingsMenuOpen = !this.settingsMenuOpen;
      this.appsMenuOpen = false;
      this.profileMenuOpen = false;
    } else if (menu === 'profile') {
      this.profileMenuOpen = !this.profileMenuOpen;
      this.appsMenuOpen = false;
      this.settingsMenuOpen = false;
    }
  }

  closeDropdowns(): void {
    this.appsMenuOpen = false;
    this.settingsMenuOpen = false;
    this.profileMenuOpen = false;
  }
}
