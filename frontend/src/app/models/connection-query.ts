import { Role } from "./role.enum";

export class ConnectionQuery {

    public alias: string | null = null;
    public invitationKey: string | null = null;
    public myDid: string | null = null;
    public state: string | null = null;
    public theirDid: string | null = null;
    public theirRole: Role | null = null;

    constructor() {
    }
}
