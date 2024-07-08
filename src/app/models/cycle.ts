import { Artwork } from "./artwork";

export class Cycle {
    public Id: number;
    public Name: string;
    public Description: string;
    public ImageData: string;
    public Artworks: Artwork[];

    constructor(
        Id: number,
        Name: string = "",
        Description: string = "",
        ImageData: string = "",
        Artworks: Artwork[] = []
    ) {
        this.Id = Id;
        this.Name = Name;
        this.Description = Description;
        this.ImageData = ImageData;
        this.Artworks = Artworks;
    }

    get ArtworkIds(): number[] {
        return this.Artworks.map(artwork => artwork.Id);
    }
}