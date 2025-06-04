import { OrderItem } from "./order-item";

export class Order {
    public Id: string;
    public UserId: string;
    public Amount: number;
    public Status: string;
    public PaymentIntentId: string;
    public ReceiptUrl: string;
    public Description: string;
    public BillingAddress: string;
    public CreatedAt: string;
    public Metadata: string;
    public OrderItems: OrderItem[] = [];

    constructor(Id: string, UserId: string, Amount: number, Status: string, PaymentIntentId: string, ReceiptUrl: string, Description: string, BillingAddress: string, CreatedAt: string, Metadata: string, OrderItems: OrderItem[]) {
        this.Id = Id;
        this.UserId = UserId;
        this.Amount = Amount;
        this.Status = Status;
        this.PaymentIntentId = PaymentIntentId;
        this.ReceiptUrl = ReceiptUrl;
        this.Description = Description;
        this.BillingAddress = BillingAddress;
        this.CreatedAt = CreatedAt;
        this.Metadata = Metadata;
        this.OrderItems = OrderItems;
    }
}