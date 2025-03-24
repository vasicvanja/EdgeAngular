export class Role {
    Id: number;
    Name: string;
    NormalizedName: string;
    ConcurrencyStamp: string;

    constructor(Id: number, Name: string, NormalizedName: string, ConcurrencyStamp: string) {
        this.Id = Id;
        this.Name = Name;
        this.NormalizedName = NormalizedName;
        this.ConcurrencyStamp = ConcurrencyStamp;
    }
}