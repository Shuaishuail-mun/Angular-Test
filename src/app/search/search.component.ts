import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {DataService} from "../data.service";
import {IpData} from "../../objects";
import {shareReplay} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  ipAddress = new FormControl('76.125.94.0');
  constructor(private http:HttpClient, private dataService:DataService) { }

  ngOnInit(): void {
  }
  startSearch(){
    let url = "../assets/" + this.ipAddress.value + ".json";
    this.http.get<IpData>(url).pipe(shareReplay(1)).subscribe((data) => {
      this.dataService.emitDataChange(data);
    });
  }
}
