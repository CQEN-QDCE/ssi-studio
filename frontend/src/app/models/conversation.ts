import { ConversationMessage } from "./conversationMessage";

export class Conversation {

    public connectionId: string = '';
    public messages: ConversationMessage[] = []

    constructor() {
    }
}
