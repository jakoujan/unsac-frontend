import { Module } from './components/ui/main-nav/module';

export const MODULES: Array<Module> = [
  {
    title: 'Casos',
    icon: 'fas fa-fw fa-sliders-h',
    id: 'cases',
    submodules: [
      {
        name: 'Nuevo',
        id: 'new-case',
        uri: 'cases/new',
        icon: 'fas fa-fw fa-user-tie',
        default: true,
        active: false
      },
      {
        name: 'Editar',
        id: 'edit-case',
        uri: 'cases/edit',
        icon: 'fas fa-fw fa-user',
        default: true,
        active: false
      }
    ],
    opened: false
  },
  {
    title: 'Administración',
    icon: 'fas fa-fw fa-sliders-h',
    id: 'administration',
    submodules: [
      {
        name: 'Clientes',
        id: 'customers',
        uri: 'administration/customers',
        icon: 'fas fa-fw fa-user-tie',
        default: true,
        active: false
      },
      {
        name: 'Usuarios',
        id: 'users',
        uri: 'administration/users',
        icon: 'fas fa-fw fa-user',
        default: true,
        active: false
      }
    ],
    opened: false
  }

];