export class User {
    public Id: string;
    public FirstName: string;
    public LastName: string;
    public UserName: string;
    public Email: string;
    public PhoneNumber: string;
    public Enabled: boolean;
    public Role: string;

    constructor(Id: string, FirstName: string = "", LastName: string = "", UserName: string = "", Email: string = "", PhoneNumber: string = "", Enabled: boolean, Role: string = "") {
        this.Id = Id;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.UserName = UserName;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
        this.Enabled = Enabled;
        this.Role = Role;
    }
}