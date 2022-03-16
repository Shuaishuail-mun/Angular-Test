import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {DataService} from "../data.service";
import {IpData} from "../../objects";
import {shareReplay} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IpCacheService} from "../ip-cache.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  ipAddress = new FormControl('');
  showNoResult: boolean = false;
  constructor(private http:HttpClient, private dataService:DataService, private ipCacheService:IpCacheService) { }

  ngOnInit(): void {
  }
  startSearch(){
    this.showNoResult = false;
    this.dataService.emitDataChange({});
    let url = "../assets/" + this.ipAddress.value + ".json";
    let cacheData = this.ipCacheService.getIpData(url);
    if(!cacheData) {
      this.http.get<IpData>(url).pipe(shareReplay(1)).subscribe((data) => {
        this.dataService.emitDataChange(data);
        this.ipCacheService.setValue(data, url);
      }, (error) => {
        this.showNoResult = true;
      });
    }else{
      this.dataService.emitDataChange(cacheData);
    }
  }

  closeAlert(){
    this.showNoResult = false;
  }
}
