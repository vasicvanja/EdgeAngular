import { Artwork } from "./artwork";

export class Cycle {
    public Id: number | null;
    public Name: string;
    public Description: string;
    public Artworks: Artwork[];

    constructor(
        Id: number | null = null,
        Name: string = "",
        Description: string = "",
        Artworks: Artwork[]
    ) {
        this.Id = Id;
        this.Name = Name;
        this.Description = Description; 
        this.Artworks = Artworks;       
    }
}