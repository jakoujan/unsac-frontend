import { Module } from './components/ui/main-nav/module';

export const MODULES: Array<Module> = [
  {
    title: 'Agenda',
    icon: 'fas fa-fw fa-sliders-h',
    id: 2,
    submodules: [
      {
        name: 'Asignación',
        id: 1,
        uri: 'assignment',
        icon: 'fas fa-fw fa-user-tie',
        default: true,
        active: false
      },
      {
        name: 'Modificación',
        id: 2,
        uri: 'assignment/edit',
        icon: 'fas fa-fw fa-user',
        default: false,
        active: false
      },
      {
        name: 'Logistica',
        id: 3,
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
    id: 1,
    submodules: [
      {
        name: 'Clientes',
        id: 4,
        uri: 'administration/customers',
        icon: 'fas fa-fw fa-user-tie',
        default: true,
        active: false
      },
      {
        name: 'Usuarios',
        id: 5,
        uri: 'administration/users',
        icon: 'fas fa-fw fa-user',
        default: false,
        active: false
      },
      {
        name: 'Instructores',
        id: 6,
        uri: 'administration/instructors',
        icon: 'fas fa-fw fa-user',
        default: false,
        active: false
      },
      {
        name: 'Cursos',
        id: 7,
        uri: 'administration/courses',
        icon: 'fas fa-fw fa-user',
        default: false,
        active: false
      }
    ],
    opened: false
  }
];
