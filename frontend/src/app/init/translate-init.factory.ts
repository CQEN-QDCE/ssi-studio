import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from "rxjs";

export function translateInitializerFactory(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('fr');
    return lastValueFrom(translate.use('fr'));
  };
}