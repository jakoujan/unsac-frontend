// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: '',
  user: 'angularapp',
  password: '12345'
};

export const constants = {
  SESSION: 'session',
  MODULES: 'modules',
  MODULE: 'module',
  LOGIN_OK: 200,
  LOGIN_NOT_OK: 403,
  TOKEN_VALUE: 'token',
  APPLICATION_TITLE: '<strong>UNIPROTEC</strong> SAC',
  APPLICATION_TITLE_ALT: 'Autocase',
  CONFIRMATION_DIALOG_TITLE: 'Confirmar acción'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
