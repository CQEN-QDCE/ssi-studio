import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';
import { MyService } from './services/my.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ssi-studio';
  givenName: string = '';
  familyName: string = '';
  firstFamilyNameLetter: string = '';
  email: string = '';
  username: string = '';

  constructor(public translate: TranslateService, private keycloakService: KeycloakService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');
  }

  ngOnInit() {
    try {
      const keycloak = this.keycloakService.getKeycloakInstance();
      if (keycloak && keycloak.tokenParsed) {
        this.email = keycloak.tokenParsed["email"];
        this.username = keycloak.tokenParsed["preferred_username"];
        this.givenName = keycloak.tokenParsed["given_name"];
        this.familyName = keycloak.tokenParsed["family_name"];
        this.firstFamilyNameLetter = this.familyName.charAt(0).toUpperCase();
      }
    } catch (e){
      console.log('Failed to load user details', e);
    }
  }

  logout() {
    this.keycloakService.logout();
  }
} 
