export class CreateCycle {
    public Name: string;
    public Description: string;
    public ImageData: string;
    public ArtworkIds: number[];

    constructor(
        Name: string = "",
        Description: string = "",
        ImageData: string = "",
        ArtworkIds: number[] = []
    ) {
        this.Name = Name;
        this.Description = Description;
        this.ImageData = ImageData;
        this.ArtworkIds = ArtworkIds;
    }
}