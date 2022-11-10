import { Initiator } from "./initiator.enum";
import { Presentation } from "./presentation";
import { PresentationExchangeRole } from "./presentation-exchange-role.enum";
import { PresentationExchangeState, PresentationExchangeStateConvert } from "./presentation-exchange-state.enum";

export class PresentationExchange {

    id: string = '';

    autoPresent: boolean = false; // Prover choice to auto-present proof as verifier requests.

    connectionId: string = '';

    createdAt: Date = new Date();

    updatedAt: Date = new Date();

    errorMessage: string = '';

    initiator: Initiator = Initiator.Self;

    presentation: Presentation | null = null;

    presentationRequest: any = null;

    state: PresentationExchangeState = PresentationExchangeState.RequestSent;

    role: PresentationExchangeRole = PresentationExchangeRole.Prover;

    threadId: string = '';

    trace: boolean = false;

    verified: boolean = false;

    constructor() {
    }

    toDto(): any {
        return {
            presentation_exchange_id: this.id,
            auto_present: this.autoPresent,
            connection_id: this.connectionId,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            error_msg: this.errorMessage,
            initiator: this.initiator,
            presentation: this.presentation,
            presentation_request: this.presentationRequest,
            state: this.state,
            role: this.role,
            thread_id: this.threadId,
            trace: this.trace,
            verified: this.verified
        };
    }

    static fromDto(dto: any): PresentationExchange {

        let presentationExchange = new PresentationExchange();

        presentationExchange.id = dto.presentation_exchange_id;
        presentationExchange.autoPresent = dto.auto_present;
        presentationExchange.connectionId = dto.connection_id;
        presentationExchange.createdAt = new Date(dto.created_at);
        presentationExchange.updatedAt = new Date(dto.updated_at);
        presentationExchange.errorMessage = dto.error_msg;
        presentationExchange.initiator = dto.initiator;
        presentationExchange.presentation = Presentation.fromDto(dto.presentation);
        presentationExchange.presentationRequest = dto.presentation_request;
        presentationExchange.state = PresentationExchangeStateConvert.parse(dto.state);
        presentationExchange.role = dto.role;
        presentationExchange.threadId = dto.thread_id;
        presentationExchange.trace = dto.trace;
        presentationExchange.verified = dto.verified === 'true';
        
        return presentationExchange;
    }
}