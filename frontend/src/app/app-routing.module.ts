import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialTemplateComponent } from './credential-template/credential-template.component';
import { ConnectionsComponent } from './connection/connections.component';
import { HomeComponent } from './dashboard/home.component';
import { LaboratoryComponent } from './laboratory/laboratory.component';
import { VerificationTemplateComponent } from './verification-template/verification-template.component';
import { AgentTemplateComponent } from './agent-template/agent-template-list.component';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'laboratories/:id', component: LaboratoryComponent, canActivate: [AuthenticationGuard], children: [
    { path: 'connections', component: ConnectionsComponent, canActivate: [AuthenticationGuard] },
    { path: 'credentials', component: CredentialTemplateComponent, canActivate: [AuthenticationGuard] },
    { path: 'verifications', component: VerificationTemplateComponent, canActivate: [AuthenticationGuard] },
    { path: 'agents', component: AgentTemplateComponent, canActivate: [AuthenticationGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
