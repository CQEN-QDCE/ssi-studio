import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Connection } from '../models/connection';
import { ConnectionQuery } from '../models/connection-query';
import { CreateCredentialDefinitionRequest } from '../models/create-credential-definition-request';
import { CreateInvitationRequest } from '../models/create-invitation-request';
import { CreateInvitationResponse } from '../models/create-invitation-response';
import { CreateSchemaRequest } from '../models/create-schema-request';
import { CreateSchemaResponse } from '../models/create-schema-response';
import { CredentialDefinition } from '../models/credential-definition';
import { Invitation } from '../models/invitation';
import { Role } from '../models/role.enum';
import { Schema } from '../models/schema';
import { OcaSchemaQuery } from '../oca/models/oca-schema-query';
import { OcaRepositoryService } from '../oca/services/oca-repository.service';
import { ConnectionService } from '../services/connection.service';
import { CredentialDefinitionService } from '../services/credential-definition.service';
import { IssuerService } from '../services/issuer.service';
import { SchemaService } from '../services/schema.service';
import { OCA, 
  CaptureBase, 
  EntryOverlay, 
  MetaOverlay, 
  EntryCodeOverlay, 
  OCABuilder,
  LabelOverlay, 
  AttributeBuilder,
  Encoding,
  Entry,
  AttributeType,
  FormLayoutOverlay, 
  InformationOverlay, 
  CredentialLayoutOverlay, 
  FormatOverlay } from 'oca.js'
import { OcaJs } from 'oca.js-form-core'
import { OcaFormBuilderComponent } from '../oca/components/oca-form-builder.component';
import * as ocaPkg from 'oca.js'
import { AgentTemplate } from '../models/agent-template';

interface Book {
  name: string;
  author: string;
}

@Component({
  selector: 'schema-editor',
  templateUrl: './schema-editor.component.html',
  styleUrls: ['./schema-editor.component.css']
})
export class SchemaEditorComponent implements OnInit {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  books: Book[];

  selectedBook: string;
  
  invitationQrCode: string = '';

  invitation: Invitation = new Invitation();

  connectionId: string = '';

  currentLanguage: string = 'en_US';

  languages: string[] = [];

  agentTemplate: AgentTemplate | null = null;

  selectedLanguages: string[] = [];

  @ViewChild('fb') fb: OcaFormBuilderComponent | null = null;

  constructor(private schemaService: SchemaService, 
              private connectionService: ConnectionService, 
              private ocaRepositoryService: OcaRepositoryService,
              private credentialDefinitionService: CredentialDefinitionService) { 
    this.books = [
      {name: 'Book1', author: 'Author1'},
      {name: 'Book2', author: 'Author2'},
      {name: 'Book3', author: 'Author3'},
      {name: 'Book4', author: 'Author4'},
      {name: 'Book5', author: 'Author5'}
  ];    
    this.selectedBook = '';
    this.languages.push('en_US');
    this.languages.push('fr_FR');
    this.selectedLanguages.push('en_US');
  }

  ngOnInit(): void {
    this.fb?.addSupportedLanguage('fr_FR');
  }
  
  changeCurrentLanguage(language: string): void {
    this.currentLanguage = language;
  }

  changeSupportedLanguages(languages: string[]): void {
    this.fb?.setSupportedLanguages(languages);
  }

  addCategory(name: string): void {
    this.fb?.addCategory(name);
  }

  searchConnection() {
    const query = new ConnectionQuery();
    query.theirRole = Role.invitee;
    if (this.agentTemplate)
    this.connectionService.search(this.agentTemplate, query).pipe(takeUntil(this.ngUnsubscribe)).subscribe((results: Connection[]) => {
      let bla = 1;
    });
  }

  searchOcaSchema() {
    /*
    let builder2 = new OCABuilder(Encoding.Utf8).addName({
      en_EN: 'Driving Licence',
      pl_PL: 'Prawo Jazdy'
    })
    .addDescription({
      en_EN: 'OCA for driving licence',
      pl_PL: 'OCA dla prawa jazdy'
    }).finalize();

    let builder = new OCABuilder(Encoding.Utf8).addName({
      en_EN: 'Driving Licence',
      pl_PL: 'Prawo Jazdy'
    })
    .addDescription({
      en_EN: 'OCA for driving licence',
      pl_PL: 'OCA dla prawa jazdy'
    })
    .addAttribute(
      new AttributeBuilder('name', AttributeType.Text)
        .setPii()
        .addLabel({
          en_EN: 'Category 1|Name: ',
          pl_PL: 'Kategoria 1|Imię: '
        })
        .addInformation({
          en_EN: 'Provide your name',
          pl_PL: 'Wprowadź swoje imię'
        })
        .build()
    )
    .addAttribute(
      new AttributeBuilder('gender', AttributeType.Text)
        .addEncoding(Encoding.Iso8859_1)
        .addLabel({
          en_EN: 'Category 1|Subcategory 1|Gender: ',
          pl_PL: 'Kategoria 1|Podkategoria 1|Płeć: '
        })
        .addEntryCodes(['m', 'f'])
        .addEntries([
          new Entry('m', {
            en_EN: 'Male',
            pl_PL: 'Mężczyzna'
          }).plain(),
          new Entry('f', {
            en_EN: 'Female',
            pl_PL: 'Kobieta'
          }).plain()
        ])
        .build()
    )
    .addAttribute(
      new AttributeBuilder('birth_date', AttributeType.Date)
        .setPii()
        .addLabel({
          en_EN: 'Category 1|Subcategory 1|Birth date: ',
          pl_PL: 'Kategoria 1|Podkategoria 1|Data urodzin: '
        })
        .addFormat('DD-MM-YYYY')
        .build()
    )
    .addAttribute(
      new AttributeBuilder('age', AttributeType.Numeric)
        .addLabel({
          en_EN: 'Category 1|Age: ',
          pl_PL: 'Kategoria 1|Wiek: '
        })
        .addUnit('years')
        .build()
    )
    .addAttribute(
      new AttributeBuilder('categories', AttributeType.ArrayText)
        .addLabel({
          en_EN: 'Category 1|Categories: ',
          pl_PL: 'Kategoria 1|Kategorie: '
        })
        .addInformation({
          en_EN: 'Select licence categories',
          pl_PL: 'Wybierz kategorie uprawnień'
        })
        .addEntryCodes(['a1', 'a2', 'b1', 'b2'])
        .addEntries([
          new Entry('a1', {
            en_EN: 'A1',
            pl_PL: 'A1'
          }).plain(),
          new Entry('a2', {
            en_EN: 'A2',
            pl_PL: 'A2'
          }).plain(),
          new Entry('b1', {
            en_EN: 'B1',
            pl_PL: 'B1'
          }).plain(),
          new Entry('b2', {
            en_EN: 'B2',
            pl_PL: 'B2'
          }).plain()
        ])
        .build()
    )
    .addAttribute(
      new AttributeBuilder('consent', AttributeType.Boolean)
        .addLabel({
          en_EN: 'Category 1|Consent: ',
          pl_PL: 'Kategoria 1|Zgoda: '
        })
        .build()
    )
    .addAttribute(
      new AttributeBuilder('reference', AttributeType.Sai)
        .addSai('EjRUyKD1ATwaPeYxUi5jlZHisIAMB-27-ddciHRZOg0s')
        .addLabel({
          en_EN: 'Category 2|Reference: ',
          pl_PL: 'Kategoria 2|Referencja: '
        })
        .build()
    )
    .finalize(); 

*/





    this.fb?.addSupportedLanguage('fr_FR');
    const query = new OcaSchemaQuery();
    query.namespace = 'test';
    this.ocaRepositoryService.search(query).pipe(takeUntil(this.ngUnsubscribe)).subscribe((ocaSchemas: any[]) => {
      let bla = 1;
    });
//    this.ocaRepositoryService.getArchive('EjRUyKD1ATwaPeYxUi5jlZHisIAMB-27-ddciHRZOg0s').pipe(takeUntil(this.ngUnsubscribe)).subscribe((file: Blob) => {
//      saveAs(file, "/Users/foxbike/Downloads/hello world.zip");
//    });
    // Mon SAI: E0ttcf4zZhRiTkazvq8X4T69q3hzug6t8zR8mAaMCe1U
    // Un SAI: EjRUyKD1ATwaPeYxUi5jlZHisIAMB-27-ddciHRZOg0s
    this.ocaRepositoryService.get('E0ttcf4zZhRiTkazvq8X4T69q3hzug6t8zR8mAaMCe1U').pipe(takeUntil(this.ngUnsubscribe)).subscribe((schema: any) => {
      let pii = schema.capture_base.pii_attributes;
      delete schema.capture_base.pii_attributes;
      schema.capture_base.pii = pii;
      const ocaJs = new OcaJs({}); 
      ocaJs.createStructure(schema).then(ocaStructure => {
        let bla = 1;        
      })
      .catch(error => {
        console.log(error);
      });
    });
  }

  createInvitation() {
    let request: CreateInvitationRequest = {
      meditationId: '',
      metadata: '',
      recipientKeys: [],
      routingKeys: [],
      serviceEndpoint: ''
    };
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    this.connectionService.createInvitation(agentTemplate, request).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: CreateInvitationResponse) => {
      this.invitationQrCode = response.invitationUrl;
      this.invitation = response.invitation;
      this.connectionId = response.connectionId;
    });
  }

  verifyConnection() {
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    this.connectionService.get(agentTemplate, this.connectionId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: Connection) => {
      let bla = 1;
    });
  }

  createSchema() {
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    let request: CreateSchemaRequest = new CreateSchemaRequest();
    request.name = 'Test Angular';
    request.version =  '1.0';
    request.attributes = ['attr1', 'attr2'];
    this.schemaService.create(agentTemplate, request).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: CreateSchemaResponse) => {
      let bla = 1;
      this.schemaService.search(agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: string[]) => {
        let bla = 1;
        this.schemaService.get(agentTemplate, 'Ep31SvFAetugFPe5CGzJxt:2:Test Angular:1.0').pipe(takeUntil(this.ngUnsubscribe)).subscribe((response: Schema) => {
          let bla = 1;
        });
      });
    });
  }

  createCredentialDefinition() {
    if (this.agentTemplate == null) return;
    let agentTemplate = this.agentTemplate;
    let request: CreateCredentialDefinitionRequest = new CreateCredentialDefinitionRequest();
    request.revocationRegistrySize = 1000;
    request.schemaId = 'Ep31SvFAetugFPe5CGzJxt:2:Test Angular:1.0';
    request.supportRevocation = false;
    request.tag = 'My first';
    this.credentialDefinitionService.create(agentTemplate, request).pipe(takeUntil(this.ngUnsubscribe)).subscribe((credentialDefinitionId: string) => {
      let bla = 1;
      this.credentialDefinitionService.search(agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe((credentialDefinitionIds: string[]) => {
        let bla = 1;
        this.credentialDefinitionService.get(agentTemplate, 'Ep31SvFAetugFPe5CGzJxt:3:CL:25447:My first').pipe(takeUntil(this.ngUnsubscribe)).subscribe((credentialDefinition: CredentialDefinition) => {
          let bla = 1;
        });
      });
    });
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
