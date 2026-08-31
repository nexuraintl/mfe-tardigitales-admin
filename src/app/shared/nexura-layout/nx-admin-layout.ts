import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { adminLayoutStyles } from './styles';
import { MenuItem, MenuSection, UserProfile, AppTile, SettingsOption, PrimaryAction } from './types';

@customElement('nx-admin-layout')
export class NxAdminLayout extends LitElement {
  static override styles = adminLayoutStyles;

  // Reactividad universal en Lit (Compatible 100% con TS ES2022/Angular)
  static override properties = {
    appTitle: { type: String, attribute: 'app-title' },
    activePath: { type: String, attribute: 'active-path' },
    logoPlatform: { type: String, attribute: 'logo-platform' },
    logoEntity: { type: String, attribute: 'logo-entity' },
    version: { type: String },
    menuSections: { type: Array },
    menuItems: { type: Array },
    currentUser: { type: Object },
    appGrid: { type: Array },
    settingsOptions: { type: Array },
    primaryAction: { type: Object, attribute: 'primary-action' },
    sidebarCollapsed: { state: true },
    sidebarOpenMobile: { state: true },
    openDropdown: { state: true },
    openGroups: { state: true },
    closedGroups: { state: true }
  };

  appTitle = 'Nexura Platform';
  private _activePath = '';
  get activePath(): string {
    return this._activePath;
  }
  set activePath(val: string) {
    const oldVal = this._activePath;
    this._activePath = val || '';
    this.closedGroups.clear();
    this.requestUpdate('activePath', oldVal);
  }
  logoPlatform = 'logo-app-solution.svg';
  logoEntity = 'logo (1).png';
  version = 'Versión 1.0.0';
  menuSections: MenuSection[] = [];
  menuItems: MenuItem[] = [];
  primaryAction: PrimaryAction | null = null;
  showBackButton = true;
  backPath = '';
  pageTitle = '';
  searchPlaceholder = '';
  searchQuery = '';

  currentUser: UserProfile = {
    name: 'Fabian Vargas',
    email: 'fvargas@nexura.com',
    role: 'Administrador',
    initials: 'FV'
  };

  appGrid: AppTile[] = [
    { id: 'tarjetas', name: 'Tarjetas', color: 'blue', iconText: '▣', path: '/tarjetas-contadores', active: true },
    { id: 'sociedades', name: 'Sociedades', color: 'cyan', iconText: '▣', path: '/sociedades' },
    { id: 'notificaciones', name: 'Notificaciones', color: 'orange', iconText: '●', path: '/crear-notificacion' },
    { id: 'tramites', name: 'Trámites', color: 'green', iconText: '▤', path: '/crud' },
    { id: 'reportes', name: 'Reportes', color: 'purple', iconText: '▥', path: '/reportes' },
    { id: 'validador', name: 'Validador QR', color: 'dark', iconText: '▦', path: '/validador-qr' }
  ];

  settingsOptions: SettingsOption[] = [
    { id: 'general', label: 'Configuración general', icon: '⚙' },
    { id: 'help', label: 'Ayuda', icon: '?' }
  ];

  sidebarCollapsed = false;
  sidebarOpenMobile = false;
  openDropdown: 'apps' | 'settings' | 'profile' | null = null;
  openGroups: Set<string> = new Set<string>();
  closedGroups: Set<string> = new Set<string>();

  private _boundWindowClick = (e: MouseEvent) => {
    const path = e.composedPath();
    // Si el click no provino de dentro de este elemento, cerramos los dropdowns
    if (!path.includes(this)) {
      if (this.openDropdown !== null) {
        this.openDropdown = null;
        this.requestUpdate();
      }
    }
  };

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._boundWindowClick);
    
    // Asegurar que FontAwesome esté cargado en el documento host y en el Shadow DOM
    if (typeof document !== 'undefined' && !document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
      document.head.appendChild(link);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this._boundWindowClick);
  }

  override willUpdate(changedProperties: Map<string, any>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('activePath')) {
      this.closedGroups.clear();
    }
  }

  private _toggleSidebar(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.innerWidth <= 960) {
      this.sidebarOpenMobile = !this.sidebarOpenMobile;
      if (this.sidebarOpenMobile) {
        document.body.classList.add('nx-sidebar-open');
      } else {
        document.body.classList.remove('nx-sidebar-open');
      }
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      if (this.sidebarCollapsed) {
        document.body.classList.add('nx-sidebar-collapsed');
      } else {
        document.body.classList.remove('nx-sidebar-collapsed');
        // Al expandir el sidebar, expandir automáticamente el subgrupo que contiene la ruta activa
        this.closedGroups.clear();
      }
    }
    this.requestUpdate();
  }

  private _toggleDropdown(name: 'apps' | 'settings' | 'profile', e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.openDropdown = this.openDropdown === name ? null : name;
    this.requestUpdate();
  }

  private _closeDropdowns() {
    if (this.openDropdown !== null) {
      this.openDropdown = null;
      this.requestUpdate();
    }
  }

  private _onItemClick(item: MenuItem, e: Event) {
    e.preventDefault();
    if (window.innerWidth <= 960) {
      this.sidebarOpenMobile = false;
      document.body.classList.remove('nx-sidebar-open');
    }
    this._closeDropdowns();
    
    if (item.path) {
      this.activePath = item.path;
      this.requestUpdate();
    }

    this.dispatchEvent(
      new CustomEvent('nx-navigate', {
        detail: { item, path: item.path },
        bubbles: true,
        composed: true
      })
    );
  }

  private _onAppClick(app: AppTile, e: Event) {
    e.preventDefault();
    this.openDropdown = null;
    this.requestUpdate();
    
    this.dispatchEvent(
      new CustomEvent('nx-app-change', {
        detail: { app },
        bubbles: true,
        composed: true
      })
    );

    if (app.path) {
      this.dispatchEvent(
        new CustomEvent('nx-navigate', {
          detail: { path: app.path, item: { label: app.name, path: app.path } },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  private _onProfileAction(action: string) {
    this.openDropdown = null;
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent('nx-profile-action', {
        detail: { action, user: this.currentUser },
        bubbles: true,
        composed: true
      })
    );

    if (action === 'logout') {
      this.dispatchEvent(
        new CustomEvent('nx-logout', {
          bubbles: true,
          composed: true
        })
      );
    }
  }

  private _onPrimaryActionClick(e: Event) {
    e.preventDefault();
    if (!this.primaryAction) return;

    this.dispatchEvent(
      new CustomEvent('nx-primary-action', {
        detail: { action: this.primaryAction },
        bubbles: true,
        composed: true
      })
    );

    if (this.primaryAction.path) {
      this.dispatchEvent(
        new CustomEvent('nx-navigate', {
          detail: { path: this.primaryAction.path, item: { label: this.primaryAction.label, path: this.primaryAction.path } },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  private _onBackClick(e: Event) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('nx-back', {
        bubbles: true,
        composed: true
      })
    );

    if (this.backPath) {
      this.dispatchEvent(
        new CustomEvent('nx-navigate', {
          detail: { path: this.backPath },
          bubbles: true,
          composed: true
        })
      );
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    }
  }

  private _isPathActive(path?: string): boolean {
    if (!path) return false;
    
    const target = path.toLowerCase().trim().replace(/\/+$/, '');
    if (!target) return false;

    const current = (this.activePath || (typeof window !== 'undefined' ? window.location.pathname : ''))
      .toLowerCase()
      .trim()
      .replace(/\/+$/, '');

    if (!current) return false;

    if (current === target) return true;

    const cleanTarget = target.replace(/^\/+/, '');
    if (cleanTarget && current.endsWith('/' + cleanTarget)) {
      return true;
    }

    return false;
  }

  private _hasActiveChild(item: MenuItem): boolean {
    if (!item.children || item.children.length === 0) return false;
    return item.children.some(child => this._isPathActive(child.path) || this._hasActiveChild(child));
  }

  private _isGroupOpen(item: MenuItem, groupId: string): boolean {
    if (this._hasActiveChild(item)) {
      if (this.closedGroups.has(groupId)) {
        return false;
      }
      return true;
    }
    if (this.closedGroups.has(groupId)) {
      return false;
    }
    if (this.openGroups.has(groupId)) {
      return true;
    }
    return Boolean(item.isOpen);
  }

  private _toggleGroup(item: MenuItem, groupId: string, e: Event) {
    e.preventDefault();
    e.stopPropagation();
    
    if (this.sidebarCollapsed) {
      this.sidebarCollapsed = false;
      document.body.classList.remove('nx-sidebar-collapsed');
    }

    const isCurrentlyOpen = this._isGroupOpen(item, groupId);
    const newOpen = new Set(this.openGroups);
    const newClosed = new Set(this.closedGroups);

    if (isCurrentlyOpen) {
      newOpen.delete(groupId);
      newClosed.add(groupId);
    } else {
      newClosed.delete(groupId);
      newOpen.add(groupId);
    }

    this.openGroups = newOpen;
    this.closedGroups = newClosed;
    this.requestUpdate();
  }

  private _getNormalizedSections(): MenuSection[] {
    if (this.menuSections && this.menuSections.length > 0) {
      return this.menuSections;
    }
    if (this.menuItems && this.menuItems.length > 0) {
      return [{ items: this.menuItems }];
    }
    return [];
  }

  private _getUserInitials(): string {
    if (this.currentUser.initials) {
      return this.currentUser.initials;
    }
    if (this.currentUser.name) {
      const parts = this.currentUser.name.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return this.currentUser.name.substring(0, 2).toUpperCase();
    }
    return 'FV';
  }

  private _renderIcon(iconStr?: string) {
    if (!iconStr) {
      return html`<i class="fa fa-th-large"></i>`;
    }
    const trimmed = iconStr.trim();
    // Si contiene clases de Font Awesome 4.6.3 o FA6
    if (trimmed.includes('fa-') || trimmed.startsWith('fa ') || trimmed.startsWith('fas ') || trimmed.startsWith('fab ') || trimmed.startsWith('far ')) {
      const faClass = trimmed.startsWith('fa-') && !trimmed.includes('fa ') ? `fa ${trimmed}` : trimmed;
      return html`<i class="${faClass}"></i>`;
    }
    // Si contiene prefijo de clase explícita de Material Icons o Material Symbols
    if (trimmed.startsWith('material-icons ') || trimmed.startsWith('material-symbols-outlined ')) {
      const parts = trimmed.split(/\s+/);
      const iconClass = parts[0];
      const iconName = parts.slice(1).join(' ');
      return html`<span class="${iconClass}">${iconName}</span>`;
    }
    // Por defecto renderiza como clase de FontAwesome
    return html`<i class="fa fa-${trimmed}"></i>`;
  }

  override render() {
    const rootClasses = [
      'nx-layout-root',
      this.sidebarCollapsed ? 'nx-sidebar-collapsed' : '',
      this.sidebarOpenMobile ? 'nx-sidebar-open' : ''
    ].filter(Boolean).join(' ');

    const sections = this._getNormalizedSections();
    const initials = this._getUserInitials();

    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
      <div class="${rootClasses}">
        
        <!-- ================= TOPBAR ================= -->
        <header class="nx-topbar">
          <!-- Brand & Toggle -->
          <div class="nx-topbar-brand">
            <button 
              type="button" 
              class="nx-menu-button" 
              title="Menú" 
              aria-label="Abrir o cerrar menú"
              @click="${this._toggleSidebar}">
              <i class="fa fa-bars"></i>
            </button>

            <slot name="brand-logo">
              <a href="/" class="nx-brand-link" @click="${(e: Event) => this._onItemClick({ label: 'Inicio', path: '/' }, e)}">
                <img class="nx-platform-logo" src="${this.logoPlatform}" alt="${this.appTitle}">
              </a>
            </slot>
          </div>

          <!-- Central Search Bar (Material / Google Style) -->
          <div class="nx-search-container">
            <div class="nx-search-box">
              <i class="fa fa-search nx-search-icon"></i>
              <input 
                type="text" 
                class="nx-search-input" 
                placeholder="${this.searchPlaceholder}" 
                .value="${this.searchQuery}"
                @input="${(e: Event) => {
                  this.searchQuery = (e.target as HTMLInputElement).value;
                  this.dispatchEvent(new CustomEvent('nx-search', { detail: { query: this.searchQuery }, bubbles: true, composed: true }));
                }}"
                @keydown="${(e: KeyboardEvent) => {
                  if (e.key === 'Enter') {
                    this.dispatchEvent(new CustomEvent('nx-search-submit', { detail: { query: this.searchQuery }, bubbles: true, composed: true }));
                  }
                }}">
              <button type="button" class="nx-search-filter-btn" title="Opciones de búsqueda">
                <i class="fa fa-angle-down"></i>
              </button>
            </div>
          </div>

          <!-- Actions & Dropdowns -->
          <nav class="nx-topbar-actions">
            <!-- Custom Slot Actions -->
            <slot name="header-actions"></slot>

            <!-- Apps Grid Menu -->
            <div class="nx-dropdown-host">
              <button 
                type="button" 
                class="nx-circle-button ${this.openDropdown === 'apps' ? 'active' : ''}" 
                title="Aplicaciones"
                @click="${(e: MouseEvent) => this._toggleDropdown('apps', e)}">
                <i class="fa fa-th"></i>
              </button>
              
              <div class="nx-dropdown nx-apps-menu ${this.openDropdown === 'apps' ? 'open' : ''}">
                <div class="nx-dropdown-title">Aplicaciones</div>
                <div class="nx-app-grid">
                  ${this.appGrid.map(app => html`
                    <button type="button" @click="${(e: Event) => this._onAppClick(app, e)}">
                      <span class="nx-app-tile ${app.color || 'blue'}">
                        ${this._renderIcon(app.iconClass || app.iconText)}
                      </span>
                      <span>${app.name}</span>
                    </button>
                  `)}
                </div>
              </div>
            </div>

            <!-- Settings Menu -->
            <div class="nx-dropdown-host">
              <button 
                type="button" 
                class="nx-circle-button ${this.openDropdown === 'settings' ? 'active' : ''}" 
                title="Configuración"
                @click="${(e: MouseEvent) => this._toggleDropdown('settings', e)}">
                <i class="fa fa-cog"></i>
              </button>
              <div class="nx-dropdown ${this.openDropdown === 'settings' ? 'open' : ''}">
                <div class="nx-dropdown-title">Configuración</div>
                <button type="button" @click="${() => this._onProfileAction('settings-general')}">
                  <i class="fa fa-sliders" style="font-size: 16px; color: #5f6368;"></i>
                  <span>Configuración general</span>
                </button>
                <button type="button" @click="${() => this._onProfileAction('settings-help')}">
                  <i class="fa fa-question-circle" style="font-size: 16px; color: #5f6368;"></i>
                  <span>Ayuda</span>
                </button>
              </div>
            </div>

            <!-- Entity Logo (Placed right before Profile Avatar) -->
            <div class="nx-topbar-entity">
              <slot name="entity-logo">
                <img class="nx-topbar-entity-logo" src="${this.logoEntity}" alt="Junta Central de Contadores">
              </slot>
            </div>

            <!-- Profile Menu -->
            <div class="nx-dropdown-host">
              <button 
                type="button" 
                class="nx-avatar-button" 
                title="${this.currentUser.name}"
                @click="${(e: MouseEvent) => this._toggleDropdown('profile', e)}">
                ${initials}
              </button>
              
              <div class="nx-dropdown nx-profile-menu ${this.openDropdown === 'profile' ? 'open' : ''}">
                <div class="nx-profile-summary">
                  <div class="nx-profile-avatar">${initials}</div>
                  <div>
                    <strong>${this.currentUser.name}</strong>
                    ${this.currentUser.email ? html`<small>${this.currentUser.email}</small>` : ''}
                    ${this.currentUser.role ? html`<span>${this.currentUser.role}</span>` : ''}
                  </div>
                </div>

                <button type="button" @click="${() => this._onProfileAction('profile')}">
                  <i class="fa fa-user" style="font-size: 16px; color: #5f6368;"></i>
                  <span>Mis datos</span>
                </button>
                <button type="button" @click="${() => this._onProfileAction('change-password')}">
                  <i class="fa fa-key" style="font-size: 16px; color: #5f6368;"></i>
                  <span>Cambiar contraseña</span>
                </button>
                <button type="button" @click="${() => this._onProfileAction('logout')}">
                  <i class="fa fa-sign-out" style="font-size: 16px; color: #dc3545;"></i>
                  <span style="color: #dc3545;">Cerrar sesión</span>
                </button>
              </div>
            </div>
          </nav>
        </header>

        <!-- ================= BODY ================= -->
        <div class="nx-body-wrapper">
          
          <!-- SIDEBAR -->
          <aside class="nx-sidebar">
            <!-- Botón de acción principal / FAB opcional estilo Google -->
            <slot name="sidebar-action">
              ${this.primaryAction ? html`
                <div class="nx-sidebar-action-wrapper">
                  <button 
                    type="button" 
                    class="nx-sidebar-action-btn" 
                    title="${this.primaryAction.label}"
                    @click="${this._onPrimaryActionClick}">
                    <span class="nx-action-icon">${this._renderIcon(this.primaryAction.icon || 'fa fa-plus')}</span>
                    <span>${this.primaryAction.label}</span>
                  </button>
                </div>
              ` : ''}
            </slot>

            <nav class="nx-menu-nav">
              ${sections.map((section, sIdx) => html`
                ${section.sectionTitle ? html`
                  <div class="nx-menu-section-label">${section.sectionTitle}</div>
                ` : ''}

                ${section.items.map((item, iIdx) => {
                  const hasChildren = Boolean(item.children && item.children.length > 0);
                  const groupId = item.id || `group-${sIdx}-${iIdx}-${item.label}`;
                  const isGroupOpen = hasChildren && this._isGroupOpen(item, groupId);
                  const hasActiveChild = hasChildren && this._hasActiveChild(item);
                  const isActive = !hasChildren && this._isPathActive(item.path);

                  if (hasChildren) {
                    return html`
                      <div class="nx-nav-group ${isGroupOpen ? 'open' : ''}">
                        <button 
                          type="button"
                          class="nx-nav-item nx-nav-group-header ${hasActiveChild ? 'has-active-child' : ''}"
                          title="${item.label}"
                          @click="${(e: Event) => this._toggleGroup(item, groupId, e)}">
                          <span class="nx-nav-icon">${this._renderIcon(item.icon)}</span>
                          <span class="nx-nav-text">${item.label}</span>
                          ${item.badge ? html`
                            <span class="nx-nav-badge ${item.badgeType || 'info'}">${item.badge}</span>
                          ` : ''}
                          <span class="nx-nav-arrow">
                            <i class="fa fa-angle-right"></i>
                          </span>
                        </button>

                        <div class="nx-submenu">
                          ${item.children!.map(child => {
                            const isChildActive = this._isPathActive(child.path);
                            return html`
                              <button 
                                type="button"
                                class="nx-sub-item ${isChildActive ? 'active' : ''}"
                                title="${child.label}"
                                @click="${(e: Event) => this._onItemClick(child, e)}">
                                ${child.icon ? html`
                                  <span class="nx-sub-icon">${this._renderIcon(child.icon)}</span>
                                ` : html`
                                  <span class="nx-sub-bullet"></span>
                                `}
                                <span class="nx-nav-text">${child.label}</span>
                                ${child.badge ? html`
                                  <span class="nx-nav-badge ${child.badgeType || 'info'}">${child.badge}</span>
                                ` : ''}
                              </button>
                            `;
                          })}
                        </div>
                      </div>
                    `;
                  }

                  return html`
                    <button 
                      type="button"
                      class="nx-nav-item ${isActive ? 'active' : ''}"
                      title="${item.label}"
                      @click="${(e: Event) => this._onItemClick(item, e)}">
                      <span class="nx-nav-icon">${this._renderIcon(item.icon)}</span>
                      <span class="nx-nav-text">${item.label}</span>
                      ${item.badge ? html`
                        <span class="nx-nav-badge ${item.badgeType || 'info'}">${item.badge}</span>
                      ` : ''}
                    </button>
                  `;
                })}

                ${sIdx < sections.length - 1 ? html`<div class="nx-sidebar-divider"></div>` : ''}
              `)}
            </nav>
          </aside>

          <!-- MOBILE OVERLAY BACKDROP -->
          <div class="nx-backdrop-overlay" @click="${() => { this.sidebarOpenMobile = false; document.body.classList.remove('nx-sidebar-open'); this.requestUpdate(); }}"></div>

          <!-- MAIN CONTENT AREA (SLOT) -->
          <main class="nx-main-container" @click="${this._closeDropdowns}">
            <slot></slot>
          </main>
        </div>

      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nx-admin-layout': NxAdminLayout;
  }
}
