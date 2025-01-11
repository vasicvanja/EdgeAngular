import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Artwork } from '../models/artwork';
import { environment } from '../../environments/environment';
import { CreateArtwork } from '../models/create-artwork';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworksService {

  private baseUrl: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseUrl = environment.baseUrl;
  }

  public getAllArtworks = (): any => {
    return firstValueFrom(this.http.get(this.baseUrl + "/api/Artworks/all"));
  }

  public getAllUnassociatedArtworks = (): any => {
    return firstValueFrom(this.http.get(this.baseUrl + "/api/Artworks/all-unassociated"));
  }

  public getArtworkById = (id: number): any => {
    return firstValueFrom(this.http.get(this.baseUrl + "/api/Artworks/" + id));
  }

  public createArtwork = (artwork: CreateArtwork): any => {
    return firstValueFrom(this.http.post(this.baseUrl + "/api/Artworks/create", artwork, this.authService.getHttpOptions()));
  }

  public updateArtwork = (artwork: Artwork): any => {
    return firstValueFrom(this.http.post(this.baseUrl + "/api/Artworks/update", artwork, this.authService.getHttpOptions()));
  }

  public deleteArtwork = (id: number): any => {
    return firstValueFrom(this.http.post(this.baseUrl + `/api/Artworks/delete?id=${id}`, {}, this.authService.getHttpOptions()));
  }
}
