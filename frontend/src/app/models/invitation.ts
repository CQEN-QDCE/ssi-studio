export class Invitation {

    public id: string;
    public type: string;
    public did: string;
    public imageUrl: string;
    public label: string;
    public recipientKeys: string[];
    public routingKeys: string[];
    public serviceEndpoint: string;

    constructor() {
        this.id = '';
        this.type = '';
        this.did = '';
        this.imageUrl = '';
        this.label = '';
        this.recipientKeys = [];
        this.routingKeys = [];
        this.serviceEndpoint = '';
    }
}
