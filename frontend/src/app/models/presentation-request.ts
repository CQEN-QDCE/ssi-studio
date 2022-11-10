import { ProofRequest } from "./proof-request";

export class PresentationRequest {

    public connectionId: string = '';
    public comment: string = '';
    public proofRequest: ProofRequest = new ProofRequest();
    public trace: boolean = false;

    constructor() {
    }

    static fromDto(dto: any): PresentationRequest {

        let presentationRequest = new PresentationRequest();

        presentationRequest.connectionId = dto.connectionId;
        presentationRequest.comment = dto.comment;
        presentationRequest.proofRequest = dto.proofRequest;
        presentationRequest.trace = dto.trace;
        
        return presentationRequest;
    }
}