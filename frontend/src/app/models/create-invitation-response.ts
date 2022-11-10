import { Invitation } from "./invitation";

export class CreateInvitationResponse {

    public connectionId: string;

    public invitation: Invitation;

    public invitationUrl: string;

    constructor() {
        this.connectionId = '';
        this.invitation = new Invitation();
        this.invitationUrl = '';
    }
}