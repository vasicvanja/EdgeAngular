export class OrderItem {
    public Id: string;
    public OrderId: string;
    public ArtworkId: number;
    public ArtworkName: string;
    public Price: number;
    public Quantity: number;

    constructor(Id: string, OrderId: string, ArtworkId: number, ArtworkName: string, Price: number, Quantity: number) {
        this.Id = Id;
        this.OrderId = OrderId;
        this.ArtworkId = ArtworkId;
        this.ArtworkName = ArtworkName;
        this.Price = Price;
        this.Quantity = Quantity;
    }
}