export class EmailMessage {
    public Email: string;
    public Subject: string;
    public Message: string;

    constructor(Email: string = "", Subject: string = "", Message: string = "") {
        this.Email = Email;
        this.Subject = Subject;
        this.Message = Message;
    }
}