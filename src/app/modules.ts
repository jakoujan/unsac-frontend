import { Module } from './components/ui/main-nav/module';

export const MODULES: Array<Module> = [
  {
    title: 'Agenda',
    icon: 'fas fa-fw fa-sliders-h',
    id: 'schedule',
    submodules: [
      {
        name: 'Asignación',
        id: 'assignment',
        uri: 'assignment',
        icon: 'fas fa-fw fa-user-tie',
        default: true,
        active: false
      },
      {
        name: 'Modificación',
        id: 'edit-assignment',
        uri: 'assignment/edit',
        icon: 'fas fa-fw fa-user',
        default: false,
        active: false
      },
      {
        name: 'Logistica',
        id: 'logistic',
        uri: 'assignment/logistic',
        icon: 'fas fa-fw fa-user',
        default: false,
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
        default: false,
        active: false
      },
      {
        name: 'Instructores',
        id: 'instructors',
        uri: 'administration/instructors',
        icon: 'fas fa-fw fa-user',
        default: false,
        active: false
      },
      {
        name: 'Cursos',
        id: 'courses',
        uri: 'administration/courses',
        icon: 'fas fa-fw fa-user',
        default: false,
        active: false
      }
    ],
    opened: false
  }
];
