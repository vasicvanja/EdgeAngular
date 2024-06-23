import { Artwork } from "./artwork";

export class Cycle {
    public Id: number | null;
    public Name: string;
    public Description: string;
    public ImageData: string;
    public Artworks: Artwork[];

    constructor(
        Id: number | null = null,
        Name: string = "",
        Description: string = "",
        ImageData: string = "",
        Artworks: Artwork[]
    ) {
        this.Id = Id;
        this.Name = Name;
        this.Description = Description; 
        this.ImageData = ImageData;
        this.Artworks = Artworks;       
    }
}