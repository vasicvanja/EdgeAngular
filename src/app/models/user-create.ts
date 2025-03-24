export class CreateUser {
    public UserName: string;
    public Email: string;
    public PhoneNumber: string;
    public Password: string;
    public Role: string;
    public Enabled: boolean;

    constructor(
        UserName: string = "",
        Email: string = "",
        PhoneNumber: string = "",
        Password: string = "",
        Enabled: boolean = true,
        Role: string = ""
    ) {
        this.UserName = UserName;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
        this.Password = Password;
        this.Enabled = Enabled;
        this.Role = Role;
    }
}