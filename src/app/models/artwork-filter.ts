import { ArtworkType } from "./artwork-type";

export class ArtworkFilter {
    public Technique: string
    public Type: ArtworkType | null;
    public CycleId: number;
    public MinPrice: number | null;
    public MaxPrice: number | null;
    public SortBy: string;
    public SortDirection: string;

    constructor(Technique: string, Type: ArtworkType | null, CycleId: number, MinPrice: number, MaxPrice: number, SortBy: string, SortDirection: string) {
        this.Technique = Technique;
        this.Type = Type;
        this.CycleId = CycleId;
        this.MinPrice = MinPrice;
        this.MaxPrice = MaxPrice;
        this.SortBy = SortBy;
        this.SortDirection = SortDirection;
    }
}