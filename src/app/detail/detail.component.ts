import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements  OnInit, OnChanges, AfterViewInit {

  @Input('companies') companiesData:any;
  todayDate: any='';
  currentYear:number=2022;
  minCurrent: any=10;
  maxCurrent: any=1000;
  txtCompany: string = "";
  chkRefresh: boolean = true;
  constructor(private apiService: ApiService, private datePipe: DatePipe,private _router: Router) { 
    var t1=new Date();
    this.todayDate = this.datePipe.transform(t1,'yyyy-MM-dd');
    this.currentYear = t1.getFullYear()-1;
    let myCompOneObj = new AppComponent(apiService, datePipe, _router);
    //this.router = window.location.href; 
    setInterval(() => {   
      sessionStorage.setItem("CompanyName",this.txtCompany); 
      sessionStorage.setItem("MinPrice",this.minCurrent);
      sessionStorage.setItem("MaxPrice",this.maxCurrent);
      sessionStorage.setItem("Refresh",this.chkRefresh == true ? "true" : "false");
      if(this.chkRefresh==true)
      {
        window.location.reload();
      }
    }, 120000);
    
  }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    var data = this.companiesData;
    if(sessionStorage.getItem("Refresh"))
      this.chkRefresh = sessionStorage.getItem("Refresh")=="true" ? true : false;
    else
    {
      sessionStorage.setItem("Refresh",this.chkRefresh == true ? "true" : "false");
      this.chkRefresh = sessionStorage.getItem("Refresh")=="true" ? true : false;
    }
    if(sessionStorage.getItem("CompanyName"))
      this.txtCompany = sessionStorage.getItem("CompanyName") ?? "";
    else
    {
      sessionStorage.setItem("CompanyName",this.txtCompany);
      this.txtCompany = sessionStorage.getItem("CompanyName") ?? "";
    }
    if(sessionStorage.getItem("MinPrice"))
      this.minCurrent = sessionStorage.getItem("MinPrice") ?? "";
    else
    {
      sessionStorage.setItem("MinPrice",this.minCurrent);
      this.minCurrent = sessionStorage.getItem("MinPrice") ?? "";
    }
    if(sessionStorage.getItem("MaxPrice"))
      this.maxCurrent = sessionStorage.getItem("MaxPrice") ?? "";
    else
    {
      sessionStorage.setItem("MaxPrice",this.maxCurrent);
      this.maxCurrent = sessionStorage.getItem("MaxPrice") ?? "";
    }    
  }
  ngAfterViewInit(): void {
  }
}
