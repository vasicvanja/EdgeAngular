export class User {
    public Id: string;
    public UserName: string;
    public Email: string;
    public PhoneNumber: string;
    public Enabled: boolean;
    public Role: string;

    constructor(Id: string, UserName: string = "", Email: string = "", PhoneNumber: string = "", Enabled: boolean, Role: string = "") {
        this.Id = Id;
        this.UserName = UserName;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
        this.Enabled = Enabled;
        this.Role = Role;
    }
}