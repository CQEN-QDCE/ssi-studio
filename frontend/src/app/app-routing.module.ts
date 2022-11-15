import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialTemplateComponent } from './credential-template/credential-template.component';
import { ConnectionsComponent } from './connection/connections.component';
import { HomeComponent } from './dashboard/home.component';
import { OrganizationComponent } from './organization/organization.component';
import { VerificationTemplateComponent } from './verification-template/verification-template.component';
import { AgentTemplateComponent } from './agent-template/agent-template.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'organizations/:id', component: OrganizationComponent, canActivate: [AuthGuard], children: [
    { path: 'connections', component: ConnectionsComponent, canActivate: [AuthGuard] },
    { path: 'credentials', component: CredentialTemplateComponent, canActivate: [AuthGuard] },
    { path: 'verifications', component: VerificationTemplateComponent, canActivate: [AuthGuard] },
    { path: 'agents', component: AgentTemplateComponent, canActivate: [AuthGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
