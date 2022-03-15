import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, shareReplay} from "rxjs";
import {IpData} from "../objects";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private IpDataChange = new BehaviorSubject<IpData>({});
  dataChangeEmitted$ = this.IpDataChange.asObservable();
  constructor(private http:HttpClient) {
  }
  emitDataChange(ipData:IpData){
    this.IpDataChange.next(ipData);
  }
}
