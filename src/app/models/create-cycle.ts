import { Artwork } from "./artwork";

export class CreateCycle {
    public Name: string;
    public Description: string;
    public ImageData: string;
    public Artworks: Artwork[];

    constructor(
        Name: string = "",
        Description: string = "",
        ImageData: string = "",
        Artworks: Artwork[] = []
    ) {
        this.Name = Name;
        this.Description = Description;
        this.ImageData = ImageData;
        this.Artworks = Artworks;
    }
}