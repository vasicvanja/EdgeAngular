export class Register {
    Username: string;
    Email: string;
    Password: string;
    PhoneNumber: string;

    constructor(Username: string = "", Email: string = "", Password: string = "", PhoneNumber: string = "") {
        this.Username = Username;
        this.Email = Email;
        this.Password = Password;
        this.PhoneNumber = PhoneNumber;
    }
}