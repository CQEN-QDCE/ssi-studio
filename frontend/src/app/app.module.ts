import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import {TooltipModule} from 'primeng/tooltip';
import { BlockUIModule } from 'primeng/blockui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CredentialOfferComponent } from './credential-issuer/credential-issuer.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { SchemaEditorComponent } from './schema-editor/schema-editor.component';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { DragDropModule } from 'primeng/dragdrop';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OrderListModule } from 'primeng/orderlist';
import { IssuerService } from './services/issuer.service';
import { Poller } from './services/poller.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { SchemaService } from './services/schema.service';
import { ConnectionService } from './services/connection.service';
import { CredentialDefinitionService } from './services/credential-definition.service';
import { AnonCredSchemaEditorComponent } from './anoncred/anoncred-schema-editor.component';
import { AnonCredSchemaFormComponent } from './anoncred/anoncred-schema-form.component';
import { AnonCredCredentialDefinitionEditorComponent } from './anoncred/anoncred-credential-definition-editor.component';
import { QuestionControlService } from './services/question-control.service';
import { QuestionService } from './services/question.service';
import { OcaRepositoryService } from './oca/services/oca-repository.service';
import { OcaService } from './oca/services/oca.service';
import { OcaControlToolboxComponent } from './oca/components/oca-control-toolbox.component';
import { OcaFormBuilderComponent } from './oca/components/oca-form-builder.component';
import { OcaLanguageSelectorComponent } from './oca/components/oca-language-selector.component';
import { OcaMenubarComponent } from './oca/components/oca-menubar.component';
import { OcaEditorComponent } from './oca/components/oca-editor.component';
import { OcaAttributeEditorComponent } from './oca/components/oca-attribute-editor.component';
import { DropDisableDirective } from './drop-disable.directive';
import { OrganizationService } from './services/organization.service';
import { OrganizationsViewComponent } from './organization/organizations-view.component';
import { OrganizationComponent } from './organization/organization.component';
import { HomeComponent } from './dashboard/home.component';
import { ConnectionsComponent } from './connection/connections.component';
import { CredentialTemplateService } from './services/credential-template.service';
import { VerificationTemplateService } from './services/verification-template.service';
import { CredentialTemplateComponent } from './credential-template/credential-template.component';
import { VerificationTemplateComponent } from './verification-template/verification-template.component';
import { VerificationTemplateViewComponent } from './verification-template/verification-template-view.component';
import { VerificationTemplateEditorComponent } from './verification-template/verification-template-editor.component';
import { CredentialTemplateViewComponent } from './credential-template/credential-template-view.component';
import { ConfirmationService } from 'primeng/api';
import { PresentProofService } from './services/present-proof.service';
import { VerificationRequestComponent } from './proof/verification-request.component';
import { RequestVerificationComponent } from './proof/request-verification.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AgentTemplateComponent } from './agent-template/agent-template.component';
import { AgentTemplateService } from './services/agent-template.service';
import { AgentComponent } from './agent-template/agent.component';
import { ServerService } from './services/server.service';
import { AgentConfigComponent } from './agent-template/agent-config.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RestrictionPipe } from './proof/restriction.pipe';
import { ErrorIntercept } from './error.interceptor';
import { ErrorDialogService } from './services/error-dialog.service';
import { ErrorDialogComponent } from './error/error-dialog.component';
import { IssueCredentialService } from './services/issue-credential.service';
import { IssueCredentialComponent } from './issue-credential/issue-credential.component';
import { RevocationService } from './services/revocation.service';

@NgModule({
  declarations: [
    AppComponent,
    CredentialOfferComponent,
    AgentTemplateComponent,
    AgentComponent,
    IssueCredentialComponent,
    AgentConfigComponent,
    SchemaEditorComponent,
    OcaEditorComponent,
    OrganizationsViewComponent,
    VerificationRequestComponent,
    RequestVerificationComponent,
    HomeComponent,
    ConnectionsComponent,
    ErrorDialogComponent,
    CredentialTemplateComponent,
    CredentialTemplateViewComponent,
    VerificationTemplateComponent,
    VerificationTemplateViewComponent,
    VerificationTemplateEditorComponent,
    OrganizationComponent,
    AnonCredSchemaEditorComponent,
    AnonCredSchemaFormComponent,
    AnonCredCredentialDefinitionEditorComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    OcaControlToolboxComponent,
    OcaFormBuilderComponent,
    OcaLanguageSelectorComponent,
    OcaAttributeEditorComponent,
    OcaMenubarComponent,
    DropDisableDirective,
    RestrictionPipe
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    DropdownModule,
    MenuModule,
    CheckboxModule,
    MultiSelectModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectButtonModule,
    AccordionModule,
    TooltipModule,
    BlockUIModule,
    PanelModule,
    ButtonModule,
    DialogModule,
    InputNumberModule,
    TableModule,
    DataViewModule,
    DragDropModule,
    OrderListModule,
    MenubarModule,
    ConfirmDialogModule,
    QRCodeModule
  ],
  providers: [
    ConnectionService,
    IssuerService,
    IssueCredentialService,
    Poller,
    CredentialTemplateService,
    VerificationTemplateService,
    AgentTemplateService,
    OrganizationService,
    SchemaService,
    ServerService,
    PresentProofService,
    CredentialDefinitionService,
    QuestionControlService,
    RevocationService,
    QuestionService,
    OcaRepositoryService,
    OcaService,
    ConfirmationService,
    ErrorDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}