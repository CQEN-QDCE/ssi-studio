import { ErrorNotificationType } from "./error-notification-type";

export class ErrorNotification { 
    public message: string;
    public type: ErrorNotificationType
    constructor(message: string, type: ErrorNotificationType) {
        this.message = message;
        this.type = type;
    }
}