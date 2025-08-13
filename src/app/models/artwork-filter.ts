import { ArtworkType } from "./artwork-type";

export class ArtworkFilter {
    public Type: ArtworkType | null;
    public CycleId: number;
    public MinPrice: number | null;
    public MaxPrice: number | null;
    public Width: number | null;
    public Height: number | null
    public SortBy: string;
    public SortDirection: string;

    constructor(
        Type: ArtworkType | null,
        CycleId: number,
        MinPrice: number | null,
        MaxPrice: number | null,
        Width: number | null,
        Height: number | null,
        SortBy: string,
        SortDirection: string) {
            this.Type = Type;
            this.CycleId = CycleId;
            this.MinPrice = MinPrice;
            this.MaxPrice = MaxPrice;
            this.Width = Width;
            this.Height = Height;
            this.SortBy = SortBy;
            this.SortDirection = SortDirection;
    }
}