export class CreateContactMessage {
    public Email: string;
    public Phone: string;
    public Subject: string;
    public Message: string;

    constructor(
        Email: string = "", 
        Phone: string = "", 
        Subject: string = "", 
        Message: string = "") {
            this.Email = Email;
            this.Phone = Phone;
            this.Subject = Subject;
            this.Message = Message;
    }
}