export class ChatMessage {
    id: number;
    email: string;
    message: string;
    tiemstamp: number;

    constructor(id:number, email: string, message: string, tiemstamp:number) {
        this.id = id;
        this.email = email;
        this.message = message;
        this.tiemstamp = tiemstamp;
    }
}