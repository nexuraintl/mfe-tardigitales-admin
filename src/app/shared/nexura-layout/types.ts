export interface MenuItem {
  id?: string;
  label: string;
  icon?: string;
  path?: string;
  badge?: string;
  badgeType?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  external?: boolean;
  children?: MenuItem[];
  isOpen?: boolean;
}

export interface MenuSection {
  sectionTitle?: string;
  items: MenuItem[];
}

export interface UserProfile {
  name: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
  initials?: string;
}

export interface AppTile {
  id: string;
  name: string;
  iconText?: string;
  iconClass?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'cyan' | 'gray' | 'dark';
  path?: string;
  url?: string;
  active?: boolean;
}

export interface SettingsOption {
  id: string;
  label: string;
  icon?: string;
}

export interface PrimaryAction {
  label: string;
  icon?: string;
  path?: string;
  action?: string | (() => void);
  color?: string;
}
