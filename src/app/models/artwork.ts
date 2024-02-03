import { ArtworkType } from "./artwork-type";

export class Artwork {
    public Id: number | null;
    public Name: string;
    public Description: string;
    public Technique: string;
    public Year: number;
    public Price: number;
    public Type: ArtworkType | any;
    public CycleId: number | null;

    constructor(
        Id: number | null = null,
        Name: string = "",
        Description: string = "",
        Technique: string = "",
        Year: number = 0,
        Price: number = 0,
        Type: ArtworkType | any = null,
        CycleId: number | null = null) {
            this.Id = Id;
            this.Name = Name;
            this.Description = Description;
            this.Technique = Technique;
            this.Year = Year;
            this.Price = Price;
            this.Type = Type;
            this.CycleId = CycleId;
    }
}