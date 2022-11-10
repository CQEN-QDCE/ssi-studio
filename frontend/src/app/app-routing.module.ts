import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialTemplateComponent } from './credential-template/credential-template.component';
import { ConnectionsComponent } from './connection/connections.component';
import { HomeComponent } from './dashboard/home.component';
import { OrganizationComponent } from './organization/organization.component';
import { VerificationTemplateComponent } from './verification-template/verification-template.component';
import { AgentTemplateComponent } from './agent-template/agent-template.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'organizations/:id', component: OrganizationComponent, children: [
    { path: 'connections', component: ConnectionsComponent },
    { path: 'credentials', component: CredentialTemplateComponent },
    { path: 'verifications', component: VerificationTemplateComponent },
    { path: 'agents', component: AgentTemplateComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
