export class Connection {

    public id: string;
    public accept: string;
    public alias: string;
    public errorMessage: string;
    public inboundConnectionId: string;
    public invitationKey: string;
    public invitationMode: string;
    public invitationMessageId: string;
    public myDid: string;
    public requestId: string;
    public rfc23State: string;
    public routingState: string;
    public state: string;
    public theirDid: string;
    public theirLabel: string;
    public theirPublicDid: string;
    public theirRole: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor() {
        this.id = '';
        this.accept = ''
        this.alias = ''
        this.errorMessage = ''
        this.inboundConnectionId = ''
        this.invitationKey = ''
        this.invitationMode = ''
        this.invitationMessageId = ''
        this.myDid = ''
        this.requestId = ''
        this.rfc23State = ''
        this.routingState = ''
        this.state = ''
        this.theirDid = ''
        this.theirLabel = ''
        this.theirPublicDid = ''
        this.theirRole = ''
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
