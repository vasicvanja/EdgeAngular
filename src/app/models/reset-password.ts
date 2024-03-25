export class ResetPassword {
    public Email: string;
    public Token: string;
    public NewPassword: string;
    public ConfirmPassword: string;

    constructor(Email: string = "", Token: string = "", NewPassword: string = "", ConfirmPassword: string = "") {
        this.Email = Email;
        this.Token = Token;
        this.NewPassword = NewPassword;
        this.ConfirmPassword = ConfirmPassword;
    }
}