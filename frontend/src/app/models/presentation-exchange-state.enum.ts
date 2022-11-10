export enum PresentationExchangeState {
    RequestSent = 'request_sent',
    PresentationReceived = 'presentation_received',
    Verified = 'verified'
}
export class PresentationExchangeStateConvert {
    
    static parse(value: string): PresentationExchangeState {
      switch (value?.toLowerCase()) {
        case 'request_sent':
          return PresentationExchangeState.RequestSent;
        case 'presentation_received':
            return PresentationExchangeState.PresentationReceived;
        case 'verified':
          return PresentationExchangeState.Verified;
        default:
          throw 'Invalid presentation exchange state value: ' + value;
      }
    }
}