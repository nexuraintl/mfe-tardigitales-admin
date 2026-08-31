import { css } from 'lit';

export const adminLayoutStyles = css`
  @font-face {
    font-family: 'FontAwesome';
    src: url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'),
         url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'),
         url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host {
    --nx-blue: #0d6efd;
    --nx-blue-dark: #0b5ed7;
    --nx-sidebar-width: 260px;
    --nx-sidebar-collapsed-width: 70px;
    --nx-header-height: 64px;
    --nx-border: #dadce0;
    --nx-text: #3c4043;
    --nx-muted: #6c757d;
    --nx-soft: #f1f3f4;
    --nx-bg: #f8f9fa;

    display: block;
    min-height: 100vh;
    background-color: var(--nx-bg);
    color: var(--nx-text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    box-sizing: border-box;
  }

  .material-symbols-outlined,
  .material-icons {
    font-family: 'Material Symbols Outlined', 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .nx-layout-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: var(--nx-header-height);
    margin-top: calc(var(--nx-header-height) * -1);
    background-color: var(--nx-bg);
  }

  /* ================= TOPBAR ================= */
  .nx-topbar {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 1000;
    height: var(--nx-header-height);
    display: flex;
    align-items: center;
    background: #ffffff;
    border-bottom: 1px solid #e8eaed;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1);
    padding: 0 16px 0 0;
  }

  .nx-topbar-brand {
    width: var(--nx-sidebar-width);
    height: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 0 0 var(--nx-sidebar-width);
    border-right: none;
    transition: width 0.22s, flex-basis 0.22s, padding 0.22s;
  }

  .nx-sidebar-collapsed .nx-topbar-brand {
    width: var(--nx-sidebar-collapsed-width);
    flex-basis: var(--nx-sidebar-collapsed-width);
    padding: 0 14px;
  }

  .nx-menu-button {
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: transparent;
    cursor: pointer;
    color: #5f6368;
    transition: background-color 0.15s;
    flex-shrink: 0;
  }

  .nx-menu-button:hover {
    background-color: rgba(60, 64, 67, 0.08);
  }

  .nx-menu-button i.fa {
    font-size: 24px;
    color: #5f6368;
  }

  .nx-brand-link {
    display: flex;
    align-items: center;
    min-width: 0;
    text-decoration: none;
  }

  .nx-platform-logo {
    width: 170px;
    height: 40px;
    display: block;
    object-fit: contain;
  }

  .nx-sidebar-collapsed .nx-brand-link {
    display: none;
  }

  /* BUSCADOR ESTILO GOOGLE / GPROJECT */
  .nx-search-container {
    flex: 1;
    max-width: 720px;
    margin: 0 24px 0 12px;
    display: flex;
    align-items: center;
  }

  .nx-search-box {
    width: 100%;
    height: 46px;
    background: #f1f3f4;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 12px 0 16px;
    gap: 12px;
    transition: background-color 0.2s, box-shadow 0.2s;
    border: 1px solid transparent;
  }

  .nx-search-box:focus-within {
    background: #ffffff;
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
    border-color: transparent;
  }

  .nx-search-icon {
    color: #5f6368;
    font-size: 15px;
    flex-shrink: 0;
  }

  .nx-search-input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 15px;
    color: #1f1f1f;
    font-family: inherit;
  }

  .nx-search-input::placeholder {
    color: #5f6368;
    font-weight: 400;
  }

  .nx-search-filter-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #5f6368;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.15s;
    padding: 0;
  }

  .nx-search-filter-btn:hover {
    background: rgba(60, 64, 67, 0.08);
    color: #1f1f1f;
  }

  .nx-topbar-actions {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
    flex-shrink: 0;
  }

  .nx-topbar-entity {
    display: flex;
    align-items: center;
    margin: 0 8px 0 4px;
  }

  .nx-topbar-entity-logo {
    height: 34px;
    max-width: 120px;
    display: block;
    object-fit: contain;
  }

  /* DROPDOWNS */
  .nx-dropdown-host {
    position: relative;
  }

  .nx-circle-button {
    position: relative;
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: transparent;
    color: #5f6368;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .nx-circle-button i.fa {
    font-size: 24px;
    color: #5f6368;
  }

  .nx-circle-button:hover,
  .nx-circle-button.active {
    background: rgba(60, 64, 67, 0.08);
  }

  .nx-avatar-button {
    position: relative;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: #174a7e;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
  }

  .nx-avatar-button:hover {
    opacity: 0.92;
  }

  .nx-grid-icon {
    width: 18px;
    height: 18px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }

  .nx-grid-icon i {
    display: block;
    border-radius: 1px;
    background: #5f6368;
  }

  .nx-dropdown {
    position: absolute;
    top: 49px;
    right: 0;
    z-index: 1300;
    min-width: 230px;
    padding: 7px 0;
    border: 1px solid var(--nx-border);
    border-radius: 4px;
    background: #ffffff;
    box-shadow: 0 8px 25px rgba(60, 64, 67, 0.24);
    display: none;
  }

  .nx-dropdown.open {
    display: block;
  }

  .nx-dropdown-title {
    padding: 9px 14px;
    border-bottom: 1px solid #eeeeee;
    color: #70757a;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .nx-dropdown button,
  .nx-dropdown > a {
    width: 100%;
    padding: 10px 14px;
    border: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    color: #3c4043;
    font-size: 12px;
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    font-family: inherit;
  }

  .nx-dropdown button:hover,
  .nx-dropdown > a:hover {
    background: var(--nx-soft);
  }

  /* APPS MENU */
  .nx-apps-menu {
    width: 305px;
    padding: 12px;
  }

  .nx-app-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
  }

  .nx-app-grid button,
  .nx-app-grid a {
    min-height: 76px;
    padding: 8px;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: #3c4043;
    font-size: 10px;
    text-align: center;
    border: 0;
    background: transparent;
    cursor: pointer;
    text-decoration: none;
  }

  .nx-app-grid button:hover,
  .nx-app-grid a:hover {
    background: var(--nx-soft);
  }

  .nx-app-tile {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    color: #ffffff;
    font-size: 17px;
  }

  .nx-app-tile.blue { background: #4285f4; }
  .nx-app-tile.orange { background: #f59e0b; }
  .nx-app-tile.green { background: #34a853; }
  .nx-app-tile.gray { background: #6c757d; }
  .nx-app-tile.purple { background: #7e57c2; }
  .nx-app-tile.dark { background: #455a64; }

  /* PROFILE MENU */
  .nx-profile-menu {
    width: 268px;
  }

  .nx-profile-summary {
    padding: 14px;
    display: flex;
    gap: 11px;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
  }

  .nx-profile-avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex: 0 0 46px;
    background: #174a7e;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
  }

  .nx-profile-summary strong {
    display: block;
    font-size: 12px;
    color: #3c4043;
  }

  .nx-profile-summary small {
    display: block;
    margin-top: 2px;
    color: #777777;
    font-size: 10px;
  }

  .nx-profile-summary span {
    display: block;
    margin-top: 4px;
    color: #0d6efd;
    font-size: 9px;
  }

  /* ================= SIDEBAR (ORIGINAL CLARO) ================= */
  .nx-body-wrapper {
    display: flex;
    min-height: calc(100vh - var(--nx-header-height));
    position: relative;
  }

  .nx-sidebar {
    width: var(--nx-sidebar-width);
    top: var(--nx-header-height);
    bottom: 0;
    left: 0;
    inset: var(--nx-header-height) auto 0 0;
    padding: 8px 0 60px 0;
    position: fixed;
    z-index: 800;
    overflow-y: auto;
    overflow-x: hidden;
    background: #ffffff;
    color: #3c4043;
    border-right: 1px solid #e8eaed;
    box-shadow: none;
    transition: width 0.22s, transform 0.22s;
    display: flex;
    flex-direction: column;
  }

  .nx-sidebar-collapsed .nx-sidebar {
    width: var(--nx-sidebar-collapsed-width);
  }

  /* ================= BOTON DE ACCION PRINCIPAL (FAB ESTILO GOOGLE) ================= */
  .nx-sidebar-action-wrapper {
    padding: 8px 16px 16px 12px;
    display: flex;
    justify-content: flex-start;
  }

  .nx-sidebar-action-btn {
    min-height: 48px;
    padding: 0 24px 0 16px;
    border-radius: 24px;
    border: 1px solid #dadce0;
    background: #ffffff;
    color: #3c4043;
    font-size: 14px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
    transition: box-shadow 0.2s ease, background-color 0.15s ease, transform 0.1s ease;
    font-family: inherit;
    user-select: none;
    text-decoration: none;
    white-space: nowrap;
  }

  .nx-sidebar-action-btn:hover {
    background-color: #fafafb;
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15);
    color: #202124;
  }

  .nx-sidebar-action-btn:active {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3);
    transform: scale(0.98);
  }

  .nx-sidebar-action-btn i.fa {
    font-size: 16px;
    color: #5f6368;
    font-weight: bold;
  }

  .nx-sidebar-action-btn:hover i.fa {
    color: #202124;
  }

  /* Colapsado */
  .nx-sidebar-collapsed .nx-sidebar-action-wrapper {
    padding: 14px 0 6px;
    justify-content: center;
  }

  .nx-sidebar-collapsed .nx-sidebar-action-btn {
    width: 44px;
    height: 44px;
    min-height: 44px;
    padding: 0;
    border-radius: 50%;
    justify-content: center;
    gap: 0;
  }

  .nx-sidebar-collapsed .nx-sidebar-action-btn span:not(.material-symbols-outlined):not(.material-icons):not(.nx-action-icon) {
    display: none;
  }

  .nx-menu-nav {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .nx-menu-section-label {
    margin: 16px 20px 6px 20px;
    color: #70757a;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nx-sidebar-collapsed .nx-menu-section-label {
    display: none;
  }

  .nx-nav-item {
    min-height: 38px;
    margin: 0 12px 1px 0;
    padding: 0 16px 0 24px;
    border: 0;
    border-radius: 0 20px 20px 0;
    display: flex;
    align-items: center;
    gap: 16px;
    color: #444746;
    font-size: 13.5px;
    font-weight: 400;
    background: transparent;
    width: auto;
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.15s ease, color 0.15s ease;
    position: relative;
    white-space: nowrap;
    font-family: inherit;
  }

  .nx-nav-item:hover {
    background: #f1f3f4;
    color: #202124;
  }

  .nx-nav-item.active {
    background: #f0f4f8;
    color: #1f1f1f;
    font-weight: 700;
  }

  .nx-nav-item.active::before {
    display: none !important;
  }

  .nx-sidebar-collapsed .nx-nav-item {
    justify-content: center;
    padding: 0;
    margin: 0 6px 2px 6px;
    border-radius: 20px;
  }

  .nx-nav-icon {
    width: 20px;
    flex: 0 0 20px;
    color: #5f6368;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nx-nav-item.active .nx-nav-icon {
    color: #5f6368;
  }

  .nx-nav-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nx-nav-item.active .nx-nav-text {
    font-weight: 700;
    color: #1f1f1f;
  }

  .nx-sidebar-collapsed .nx-nav-text,
  .nx-sidebar-collapsed .nx-nav-badge,
  .nx-sidebar-collapsed .nx-nav-arrow,
  .nx-sidebar-collapsed .nx-submenu {
    display: none;
  }

  /* ================= SUBMENÚS Y AGRUPACIONES ================= */
  .nx-nav-group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .nx-nav-group-header {
    cursor: pointer;
    user-select: none;
  }

  .nx-nav-group-header.has-active-child {
    color: #202124;
    font-weight: 600;
  }

  .nx-nav-group-header.has-active-child .nx-nav-icon {
    color: #5f6368;
  }

  .nx-nav-arrow {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5f6368;
    font-size: 14px;
    margin-left: auto;
    transition: transform 0.2s ease;
  }

  .nx-nav-group.open .nx-nav-arrow {
    transform: rotate(90deg);
    color: #202124;
  }

  .nx-submenu {
    display: none;
    flex-direction: column;
    width: 100%;
    background: transparent;
    border: none;
    margin: 0;
    padding: 0;
  }

  .nx-nav-group.open .nx-submenu {
    display: flex;
  }

  .nx-sidebar-collapsed .nx-submenu,
  .nx-sidebar-collapsed .nx-nav-group.open .nx-submenu {
    display: none !important;
  }

  .nx-sidebar-collapsed .nx-nav-group-header.has-active-child {
    background: #f0f4f8;
    color: #1f1f1f;
    border-radius: 20px;
    margin: 0 6px 2px 6px;
    justify-content: center;
    padding: 0;
  }

  .nx-sidebar-collapsed .nx-nav-group-header.has-active-child .nx-nav-icon {
    color: #5f6368;
  }

  .nx-sub-item {
    min-height: 36px;
    margin: 0 12px 1px 0;
    padding: 0 16px 0 38px;
    border: 0;
    border-radius: 0 20px 20px 0;
    display: flex;
    align-items: center;
    gap: 14px;
    color: #444746;
    font-size: 13px;
    font-weight: 400;
    background: transparent;
    width: auto;
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.15s ease, color 0.15s ease;
    position: relative;
    white-space: nowrap;
    font-family: inherit;
  }

  .nx-sub-item:hover {
    background: #f1f3f4;
    color: #202124;
  }

  .nx-sub-item.active {
    background: #f0f4f8;
    color: #1f1f1f;
    font-weight: 700;
  }

  .nx-sub-item.active::before {
    display: none !important;
  }

  .nx-sub-item.active .nx-nav-text {
    font-weight: 700;
    color: #1f1f1f;
  }

  .nx-sub-icon {
    width: 18px;
    flex: 0 0 18px;
    color: #5f6368;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nx-sub-item.active .nx-sub-icon {
    color: #5f6368;
  }

  .nx-sub-bullet {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #9ca3af;
    flex: 0 0 6px;
    display: inline-block;
  }

  .nx-sub-item.active .nx-sub-bullet {
    background: #5f6368;
  }

  .nx-nav-badge {
    padding: 2px 6px;
    border-radius: 2px;
    font-size: 8px;
    font-weight: 800;
  }

  .nx-nav-badge.success { background: #e6f7ee; color: #198754; }
  .nx-nav-badge.warning { background: #fff3d7; color: #d89200; }
  .nx-nav-badge.danger { background: #fdebec; color: #dc3545; }
  .nx-nav-badge.info { background: #e5f8fb; color: #087b96; }
  .nx-nav-badge.neutral { background: #eff2f5; color: #657386; }

  .nx-sidebar-divider {
    height: 1px;
    margin: 8px 16px;
    background: #e0e0e0;
  }

  .nx-sidebar-footer {
    position: absolute;
    inset: auto 0 0 0;
    min-height: 57px;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #e6e8eb;
    background: #ffffff;
  }

  .nx-sidebar-footer img {
    width: 102px;
    height: 25px;
    object-fit: contain;
  }

  .nx-sidebar-footer small {
    color: #8a9097;
    font-size: 8px;
  }

  .nx-sidebar-collapsed .nx-sidebar-footer {
    display: none;
  }

  /* ================= MAIN CONTAINER ================= */
  .nx-main-container {
    width: auto;
    flex: 1;
    margin-left: var(--nx-sidebar-width);
    padding: 0;
    min-height: calc(100vh - var(--nx-header-height));
    background: #ffffff;
    transition: margin-left 0.22s;
    min-width: 0;
  }

  .nx-content-nav-bar {
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: #ffffff;
    border-bottom: 1px solid #e8eaed;
    min-height: 64px;
    box-sizing: border-box;
  }

  .nx-content-nav-left {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
  }

  .nx-view-title {
    margin: 0;
    font-size: 22px;
    font-weight: 500;
    color: #202124;
    line-height: 1.2;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nx-content-nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: auto;
  }

  .nx-back-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    background: #f1f3f4;
    color: #444746;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, transform 0.1s ease;
    outline: none;
    flex-shrink: 0;
    box-shadow: none;
  }

  .nx-back-btn:hover {
    background: #e2e5e9;
    color: #1f1f1f;
    box-shadow: none;
  }

  .nx-back-btn:active {
    background: #d3d7dc;
    transform: scale(0.92);
  }

  .nx-back-btn i,
  .nx-back-btn span,
  .nx-back-btn i.fa {
    font-size: 15px;
    color: #444746;
  }

  .nx-back-btn:hover i,
  .nx-back-btn:hover span,
  .nx-back-btn:hover i.fa {
    color: #1f1f1f;
  }

  .nx-sidebar-collapsed .nx-main-container {
    margin-left: var(--nx-sidebar-collapsed-width);
  }

  /* MOBILE BACKDROP */
  .nx-backdrop-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 750;
  }

  /* ================= RESPONSIVE ================= */
  @media (max-width: 960px) {
    :root {
      --nx-header-height: 58px;
    }

    .nx-topbar {
      height: 58px;
    }

    .nx-topbar-brand {
      width: auto;
      flex-basis: auto;
      height: 58px;
      border-right: 0;
      padding: 0 10px;
    }

    .nx-platform-logo {
      width: 165px;
    }

    .nx-topbar-entity {
      display: none;
    }

    .nx-sidebar {
      top: 58px;
      inset: 58px auto 0 0;
      width: 260px !important;
      transform: translateX(-100%);
      box-shadow: 3px 0 13px rgba(0, 0, 0, 0.18);
    }

    .nx-sidebar-open .nx-sidebar {
      transform: translateX(0);
    }

    .nx-sidebar-open .nx-backdrop-overlay {
      display: block;
    }

    .nx-main-container {
      margin-left: 0 !important;
    }
  }

  @media (max-width: 620px) {
    .nx-platform-logo {
      width: 145px;
    }

    .nx-topbar-actions {
      padding-right: 7px;
    }

    .nx-circle-button {
      width: 34px;
      height: 34px;
    }

    .nx-apps-menu,
    .nx-profile-menu {
      right: -10px;
      max-width: calc(100vw - 20px);
    }
  }
`;
