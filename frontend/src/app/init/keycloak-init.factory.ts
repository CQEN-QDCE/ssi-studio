import { KeycloakService } from "keycloak-angular";
import { lastValueFrom } from "rxjs";
import { ConfigInitService } from "./config-init.service";

export function initializeKeycloak(
  keycloak: KeycloakService,
  configService: ConfigInitService
  ): () => Promise<any> {
    return (): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        let config: any;
        try {
          config = await lastValueFrom(configService.getConfig());
        } catch (error) {
          reject();
          return;
        }
  
        try {
          await keycloak.init({
            config: {
              url: config.KEYCLOAK_URL,
              realm: config.KEYCLOAK_REALM,
              clientId: config.KEYCLOAK_CLIENT_ID
            },
            initOptions: {
              checkLoginIframe: false
            }
          });
  
          resolve(true);
        } catch (error) {
          reject();
        }
      });
    };
  }