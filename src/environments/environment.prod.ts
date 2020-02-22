import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: '/',
  websocket: {
    topic: "/web/statistics",
    destination: '/statistics/filter'
  }
};

export const constants = {
  SESSION: 'session',
  MODULES: 'modules',
  MODULE: 'module',
  LOGIN_OK: 200,
  LOGIN_NOT_OK: 403,
  TOKEN_VALUE: 'token',
  APPLICATION_TITLE: '<strong>Auto</strong>case',
  APPLICATION_TITLE_ALT: 'Autocase'
}

export const rxStompConfig: InjectableRxStompConfig = {
  // Which server?
  brokerURL: 'ws://servicio.ispc.com.mx/ws',
  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'guest',
    passcode: 'guest'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 200,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
