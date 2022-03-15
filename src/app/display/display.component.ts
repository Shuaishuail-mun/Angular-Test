import { Component, OnInit } from '@angular/core';
import {IpData} from "../../objects";
import {DataService} from "../data.service";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  displayData:IpData = {};
  options = Array.from(Array(256).keys()).map((item) => item + '');
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.dataChangeEmitted$.subscribe((data) => {
      this.displayData = data;
    });
  }


}
