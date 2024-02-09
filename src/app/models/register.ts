export class Register {
    Username: string;
    Email: string;
    Password: string;

    constructor(Username: string = "", Email: string = "", Password: string = "") {
        this.Username = Username;
        this.Email = Email;
        this.Password = Password;
    }
}