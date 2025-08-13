export class UpdateCycle {
    public Id: number;
    public Name: string;
    public Description: string;
    public ImageData: string;
    public ArtworkIds: number[];

    constructor(
        Id: number,
        Name: string = "",
        Description: string = "",
        ImageData: string = "",
        ArtworkIds: number[] = []
    ) {
        this.Id = Id;
        this.Name = Name;
        this.Description = Description;
        this.ImageData = ImageData;
        this.ArtworkIds = ArtworkIds;
    }
}