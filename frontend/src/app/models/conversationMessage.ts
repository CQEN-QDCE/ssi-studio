export class ConversationMessage {

    public dateTime: Date = new Date();
    public content: string = '';
    public reply: boolean = false;

    constructor() {
    }
}
