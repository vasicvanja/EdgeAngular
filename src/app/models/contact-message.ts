export class ContactMessage {
    public Id: number;
    public Email: string;
    public Phone: string;
    public Subject: string;
    public Message: string;

    constructor(
        Id: number, 
        Email: string = "", 
        Phone: string = "", 
        Subject: string = "", 
        Message: string = "") {
            this.Id = Id;
            this.Email = Email;
            this.Phone = Phone;
            this.Subject = Subject;
            this.Message = Message;
    }
}