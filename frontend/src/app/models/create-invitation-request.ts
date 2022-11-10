export class CreateInvitationRequest {

    public meditationId: string;

    public metadata: any;

    public recipientKeys: string[];

    public routingKeys: string[];

    public serviceEndpoint: string;

    constructor() {
        this.meditationId = '';
        this.metadata = null;
        this.recipientKeys = [];
        this.routingKeys = [];
        this.serviceEndpoint = '';
    }
}
