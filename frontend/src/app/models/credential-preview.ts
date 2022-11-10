import { CredentialAttribute } from "./credential-attribute";

export class CredentialPreview {

    public type: string = 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview';
    public attributes: CredentialAttribute[] = []

    constructor() {
    }
}
