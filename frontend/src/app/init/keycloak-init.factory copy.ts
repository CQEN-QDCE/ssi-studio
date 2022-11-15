import { KeycloakService } from "keycloak-angular";
import { lastValueFrom, switchMap } from "rxjs";
import { ConfigInitService } from "./config-init.service";

export function initializeKeycloak(
  keycloak: KeycloakService,
  configService: ConfigInitService
  ) {
    return () =>
    lastValueFrom(configService.getConfig()
        .pipe(
          switchMap<any, any>((config) => {

            return( 
            keycloak.init({
              config: {
                url: 'http://keycloak.localhost:8080',
                realm: 'SSI-Studio',
                clientId: 'angular-app'
              },
              initOptions: {
                // pkceMethod: 'S256', 
                // must match to the configured value in keycloak
                //redirectUri: 'http://localhost:4200',   
                // this will solved the error 
                checkLoginIframe: false
              }}));
              
          })
        ))
}