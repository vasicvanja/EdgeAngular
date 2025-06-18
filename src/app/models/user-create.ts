export class CreateUser {
    public FirstName: string;
    public LastName: string;
    public UserName: string;
    public Email: string;
    public PhoneNumber: string;
    public Password: string;
    public Role: string;
    public Enabled: boolean;

    constructor(
        FirstName: string = "",
        LastName: string = "",
        UserName: string = "",
        Email: string = "",
        PhoneNumber: string = "",
        Password: string = "",
        Enabled: boolean = true,
        Role: string = ""
    ) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.UserName = UserName;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
        this.Password = Password;
        this.Enabled = Enabled;
        this.Role = Role;
    }
}