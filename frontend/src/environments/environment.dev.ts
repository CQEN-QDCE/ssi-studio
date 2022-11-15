// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    issuerHostUrl: "https://inq-agent-admin.apps.exp.openshift.cqen.ca",
    ocaRepositoryUrl: "https://repository.oca.argo.colossi.network/api/v4",
    apiUrl: "/api/v1",
    configFile: 'assets/config/config.dev.json'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
