export class User {
    public Id: number;
    public UserName: string;
    public Email: string;
    public PhoneNumber: string;
    public Role: string;

    constructor(Id: number, UserName: string = "", Email: string = "", PhoneNumber: string = "", Role: string = "") {
        this.Id = Id;
        this.UserName = UserName;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
        this.Role = Role;
    }
}