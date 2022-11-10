export class AgentConfig {
    admin: AgentConfig.Admin;
    debug: AgentConfig.Debug;
    ledger: AgentConfig.Ledger;
    defaultEndpoint: string;
    additionalEndpoints: string[];
    log: AgentConfig.Log;
    trace: AgentConfig.Trace;
    autoProvision: boolean;
    transport: AgentConfig.Transport;
    wallet: AgentConfig.Wallet;
    endorser: AgentConfig.Endorser;
    defaultLabel: string;
    constructor() {
        this.admin = new AgentConfig.Admin();
        this.debug = new AgentConfig.Debug();
        this.ledger = new AgentConfig.Ledger();
        this.defaultEndpoint = '';
        this.additionalEndpoints = [];
        this.log = new AgentConfig.Log();
        this.trace = new AgentConfig.Trace();
        this.autoProvision = false;
        this.transport = new AgentConfig.Transport();
        this.wallet = new AgentConfig.Wallet();
        this.endorser = new AgentConfig.Endorser();
        this.defaultLabel = '';
    }
}

export module AgentConfig {
    export class Admin {
        insecureMode: boolean = false;
        enabled: boolean = false;
        host: string = '';
        port: number = 0;
        webhookUrls: string[] = [];
        clientMaxRequestSize: number = 0;
    }

    export class Debug {
        autoRespondCredentialProposal: boolean = false;
        autoRespondCredentialOffer: boolean = false;
        autoRespondCredentialRequest: boolean = false;
        autoRespondPresentationProposal: boolean = false;
        autoRespondPresentationRequest: boolean = false;
        autoStoreCredential: boolean = false;
        autoAcceptInvites: boolean = false;
        autoAcceptRequests: boolean = false;
        autoRespondMessages: boolean = false;
    }

    export class Ledger {
        genesisUrl:string = '';
        keepalive: number = 0;
        readOnly: boolean = false;
        genesisTransactions: string = '';
    }

    export class Log {
        level: string = '';
    }

    export class Trace {
        target: string = '';
        tag: string = '';
        label: string = '';
    }

    export class Transport {
        inboundConfigs: InboundConfig[] = [];
        outboundConfigs: OutboundConfig[] = [];
        enableUndeliveredQueue: boolean = false;
        maxMessageSize: number = 0;
        maxOutboundRetry: number = 0;
        wsHeartbeatInterval: number = 0;
        wsTimeoutInterval: number = 0;
    }

    export class Wallet {
        name: string = '';
        type: string = '';
        storageType: string = '';
        storageConfig: string = '';
    }

    export class Endorser {
        author: boolean = false;
        endorser: boolean = false;
        autoEndorse: boolean = false;
        autoWrite: boolean = false;
        autoCreateRevReg: boolean = false;
        autoPromoteAuthorDid: boolean = false;
    }

    export class InboundConfig {
        protocol: string = '';
        host: string = '';
        port: number = 0;
    }

    export class OutboundConfig {
        protocol: string = '';
    }
}