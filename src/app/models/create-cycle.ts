import { Artwork } from "./artwork";

export class CreateCycle {
    public Name: string;
    public Description: string;
    public Artworks: Artwork[];

    constructor(
        Name: string = "",
        Description: string = "",
        Artworks: Artwork[] = []
    ) {
        this.Name = Name;
        this.Description = Description;
        this.Artworks = Artworks;
    }
}