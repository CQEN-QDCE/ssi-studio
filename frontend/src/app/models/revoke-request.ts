import { NotifyVersion } from "./notify-version.enum";

export class RevokeRequest {

    connectionId: string | null = null;
    credentialExchangeId: string | null = null;
    credentialRevocationId: string | null = null;
    notify: boolean = false;
    notifyVersion: NotifyVersion = NotifyVersion.V10;
    publish: boolean = false;
    revocationRegistryIdentifier: string | null = null;
    threadId: string | null = null;
    comment: string | null = null;

    constructor() {
    }
}
