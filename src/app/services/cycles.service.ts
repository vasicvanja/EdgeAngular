import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Cycle } from '../models/cycle';
import { environment } from '../../environments/environment';
import { CreateCycle } from '../models/create-cycle';

@Injectable({
  providedIn: 'root'
})
export class CyclesService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public getAllCycles = (): any => {
    return firstValueFrom(this.http.get(this.baseUrl + "/api/Cycles/all"));
  }
  
  public getCycleById = (id: number): any => {
    return firstValueFrom(this.http.get(this.baseUrl + "/api/Cycles/" + id));
  }

  public createCycle = (cycle: CreateCycle): any => {
    return firstValueFrom(this.http.post(this.baseUrl + "/api/Cycles/create", cycle));
  }

  public updateCycle = (cycle: Cycle): any => {
    return firstValueFrom(this.http.post(this.baseUrl + "/api/Cycles/update", cycle));
  }

  public deleteCycle = (id: number): any => {
    return firstValueFrom(this.http.post(this.baseUrl + `/api/Cycles/delete?id=${id}`, {}));
  }
}
