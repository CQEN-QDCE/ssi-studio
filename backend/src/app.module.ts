import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OcaController } from './oca.controller';
import { OcaService } from './oca.service';
import { configService } from './config.service';
import { OcaSchemaController } from './oca-schema/oca-schema.controller';
import { OcaSchemaService } from './oca-schema/oca-schema.service';
import { OrganizationService } from './organization/organization.service';
import { OrganizationController } from './organization/organization.controller';
import { Organization } from './model/organization.entity';
import { CredentialController } from './credential/credential.controller';
import { CredentialService } from './credential/credential.service';
import { VerificationService } from './verification/verification.service';
import { VerificationController } from './verification/verification.controller';
import { ConnectionController } from './connection/connection.controller';
import { ConnectionService } from './connection/connection.service';
import { Connection } from './model/connection.entity';
import { Verification } from './model/verification.entity';
import { Credential } from './model/credential.entity';
import { Agent } from './model/agent.entity';
import { AgentController } from './agent/agent.controller';
import { AgentService } from './agent/agent.service';
import { UserController } from './user/user.controller';
import { User } from './model/user.entity';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { IssueCredential } from './model/issue-credential.entity';
import { IssueCredentialController } from './issue-credential/issue-credential.controller';
import { IssueCredentialService } from './issue-credential/issue-credential.service';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
  PolicyEnforcementMode,
  TokenValidation
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: '',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.OFFLINE,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Organization]),
    TypeOrmModule.forFeature([Connection]),
    TypeOrmModule.forFeature([Credential]),
    TypeOrmModule.forFeature([Verification]),
    TypeOrmModule.forFeature([Agent]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([IssueCredential])
  ],
  controllers: [
    AppController, 
    OcaController, 
    OcaSchemaController, 
    OrganizationController, 
    CredentialController, 
    VerificationController, 
    ConnectionController, 
    AgentController,
    UserController,
    IssueCredentialController],
  providers: [
    AppService, 
    OcaService, 
    OcaSchemaService, 
    OrganizationService, 
    CredentialService, 
    VerificationService, 
    ConnectionService, 
    AgentService,
    UserService,
    IssueCredentialService,
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and 
    // methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the 
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    }],
})
export class AppModule {}
