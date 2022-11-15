import { Global, Module } from '@nestjs/common';
import { KeycloakConfigService } from './keycloak.service';

@Global()
@Module({
  providers: [KeycloakConfigService],
  exports: [KeycloakConfigService], // 👈 export PrismaService for DI
})
export class KeyCloakConfigModule {}