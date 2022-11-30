import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialTemplateListComponent } from './credential-template/credential-template-list.component';
import { ConnectionsComponent } from './connection/connections.component';
import { HomeComponent } from './dashboard/home.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { VerificationTemplateListComponent } from './verification-template/verification-template-list.component';
import { AgentTemplateListComponent } from './agent-template/agent-template-list.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { AgentTemplateDetailsComponent } from './agent-template/agent-template-details.component';
import { CredentialTemplateDetailsComponent } from './credential-template/credential-template-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'laboratories/:id', component: LaboratoryComponent, canActivate: [AuthenticationGuard], children: [
    { path: 'connections', component: ConnectionsComponent, canActivate: [AuthenticationGuard] },
    { path: 'credentials', component: CredentialTemplateListComponent, canActivate: [AuthenticationGuard] },
    { path: 'verifications', component: VerificationTemplateListComponent, canActivate: [AuthenticationGuard] },
    { path: 'agents', component: AgentTemplateListComponent, canActivate: [AuthenticationGuard] },
    { path: 'agents/:agentId', component: AgentTemplateDetailsComponent, canActivate: [AuthenticationGuard] },
    { path: 'credentials/:credentialId', component: CredentialTemplateDetailsComponent, canActivate: [AuthenticationGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
