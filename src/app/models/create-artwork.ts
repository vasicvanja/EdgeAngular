import { ArtworkType } from "./artwork-type";

export class CreateArtwork {
    public Name: string;
    public Description: string;
    public Technique: string;
    public Width: number;
    public Height: number;
    public Year: number;
    public Price: number;
    public Quantity: number;
    public ImageData: string;
    public Type: ArtworkType | any;
    public CycleId: number | null;

    constructor(
        Name: string = "",
        Description: string = "",
        Technique: string = "",
        Width: number = 0,
        Height: number = 0,
        Year: number = 0,
        Price: number = 0,
        Quantity: number = 0,
        ImageData: string = "",
        Type: ArtworkType | any = null,
        CycleId: number | null = null) {
            this.Name = Name;
            this.Description = Description;
            this.Technique = Technique;
            this.Width = Width;
            this.Height = Height;
            this.Year = Year;
            this.Price = Price;
            this.Quantity = Quantity;
            this.ImageData = ImageData;
            this.Type = Type;
            this.CycleId = CycleId;
    }
}