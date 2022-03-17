import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IpData} from "../objects";

@Injectable({
  providedIn: 'root'
})
export class IpCacheService {
  readonly CACHE_DURATION_IN_HOURS = 4;
  private cache:Cache[] = [];
  constructor() { }

  getIpData(url:string):IpData |null {
    const filterResult = this.cache.filter((cache, index) => cache.url === url);
    if(filterResult.length < 1) {
      return null;
    }
    const cacheForUrl = filterResult[0];
    if(new Date() > cacheForUrl.expires) {
      // remove the expired cache
      this.cache = this.cache.filter((cache, index) => cache.url !== url);
      return null;
    }
    return cacheForUrl.value;
  }

  setValue(value:IpData, url:string) {
    const expireDate = new Date();
    let tmpTime = expireDate.getTime();
    expireDate.setTime(tmpTime + (this.CACHE_DURATION_IN_HOURS * 60 * 60 * 1000));
    this.cache.push({
      url:url,
      value: value,
      expires: expireDate
    });
  }

  clearCache(){
    this.cache = [];
  }
}

export interface Cache{
  url:string,
  expires: Date,
  value: IpData
}
