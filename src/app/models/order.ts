export class Order {
    public Id: string
    public UserId: string;
    public Amount: number;
    public Status: string;
    public PaymentIntentId: string;
    public ReceiptUrl: string;
    public Description: string;
    public Metadata: string;

    constructor(Id: string, UserId: string, Amount: number, Status: string, PaymentIntentId: string, ReceiptUrl: string, Description: string, Metadata: string) {
        this.Id = Id;
        this.UserId = UserId;
        this.Amount = Amount;
        this.Status = Status;
        this.PaymentIntentId = PaymentIntentId;
        this.ReceiptUrl = ReceiptUrl;
        this.Description = Description;
        this.Metadata = Metadata;
    }
}