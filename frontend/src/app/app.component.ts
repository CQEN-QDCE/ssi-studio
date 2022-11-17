import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ssi-studio';
  constructor(public translate: TranslateService, private keycloakService: KeycloakService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('fr');
  }

  logout() {
    this.keycloakService.logout();
  }
} 
