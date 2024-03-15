export class SmtpSettings {
    public Id: number | null;
    public Username: string;
    public Password: string;
    public SenderEmail: string;
    public SenderName: string;
    public Host: string;
    public Port: number;
    public Authentication: boolean;
    public EnableSsl: boolean;
    public EnableSmtpSettings: boolean;
    
    constructor(
        Id: number | null = null,
        Username: string = "",
        Password: string = "",
        SenderEmail: string = "",
        SenderName: string = "",
        Host: string = "",
        Port: number = 0,
        Authentication: boolean = false,
        EnableSsl: boolean = false,
        EnableSmtpSettings: boolean = false) {
            this.Id = Id;
            this.Username = Username;
            this.Password = Password;
            this.SenderEmail = SenderEmail;
            this.SenderName = SenderName;
            this.Host = Host;
            this.Port = Port;
            this.Authentication = Authentication;
            this.EnableSsl = EnableSsl;
            this.EnableSmtpSettings = EnableSmtpSettings;
    }
}