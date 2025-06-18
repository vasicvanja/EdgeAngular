export class Register {
    FirstName: string;
    LastName: string;
    Username: string;
    Email: string;
    Password: string;
    PhoneNumber: string;

    constructor(FirstName: string = "", LastName: string = "", Username: string = "", Email: string = "", Password: string = "", PhoneNumber: string = "") {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Username = Username;
        this.Email = Email;
        this.Password = Password;
        this.PhoneNumber = PhoneNumber;
    }
}