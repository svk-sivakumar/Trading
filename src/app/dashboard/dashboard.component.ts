import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input('companies') companiesData:any;
  todayDate: any='';
  currentYear:number=2022;
  minCurrent: any=1;
  maxCurrent: any=1000;
  txtCompany: string = "";
  txtRecos: string = "BUY-BUY-BUY";
  txtGroup: string = "A";
  txtChange: string = "G";
  txtSearch: string ="";
  chkRefresh: boolean = true;
  prevPage: any=1;
  nextPage: any=1;
  constructor(private apiService: ApiService, private datePipe: DatePipe,private _router: Router) { 
    var t1=new Date();
    this.todayDate = this.datePipe.transform(t1,'yyyy-MM-dd');
    this.currentYear = t1.getFullYear()-1;
    let myCompOneObj = new AppComponent(apiService, datePipe, _router);
    //this.router = window.location.href; 
    setInterval(() => {   
      sessionStorage.setItem("CompanyName",this.txtCompany);
      sessionStorage.setItem("Group",this.txtGroup);
      //sessionStorage.setItem("Recos",this.txtRecos);  
      sessionStorage.setItem("MinPrice",this.minCurrent);
      sessionStorage.setItem("MaxPrice",this.maxCurrent);
      sessionStorage.setItem("Change",this.txtChange);
      sessionStorage.setItem("Search",this.txtSearch);
      sessionStorage.setItem("Refresh",this.chkRefresh == true ? "true" : "false");
      if(this.chkRefresh==true)
      {
        window.location.reload();
      }
    }, 60000);
    
  }
  pageClick(type: any)
  {
    if(type =='P' && this.prevPage>1)
       this.prevPage = parseInt(this.prevPage)-1;
    else if(type =='N' && this.nextPage<11)
       this.nextPage = parseInt(this.nextPage)+1;

       sessionStorage.setItem("CompanyName",this.txtCompany ?? "");
       sessionStorage.setItem("Group",this.txtGroup ?? "");
       //sessionStorage.setItem("Recos",this.txtRecos ?? "");  
       sessionStorage.setItem("MinPrice",this.minCurrent ?? "");
       sessionStorage.setItem("MaxPrice",this.maxCurrent ?? "");
       sessionStorage.setItem("Change",this.txtChange ?? "");
       sessionStorage.setItem("Search",this.txtSearch ?? "");
       sessionStorage.setItem("Refresh",this.chkRefresh == true ? "true" : "false");
  }
  ngOnInit(): void {
  }
  ngOnChanges(): void {
    var data = this.companiesData;
    if(this._router.url.indexOf("/dashboard")!=-1)
    {
      var page = this._router.url.split("/");
      let pageNumber=page[page.length-1];
      this.nextPage= pageNumber;
      this.prevPage = this.nextPage;
    
      if(sessionStorage.getItem("Refresh")!=null && sessionStorage.getItem("Refresh") != this.chkRefresh.toString())
        this.chkRefresh = sessionStorage.getItem("Refresh")=="true" ? true : false;
      else
      {
        sessionStorage.setItem("Refresh",this.chkRefresh == true ? "true" : "false");
        this.chkRefresh = sessionStorage.getItem("Refresh")=="true" ? true : false;
      }
      if(sessionStorage.getItem("CompanyName")!=null && sessionStorage.getItem("CompanyName")!=this.txtCompany)
        this.txtCompany = sessionStorage.getItem("CompanyName") ?? "";
      else
      {
        sessionStorage.setItem("CompanyName",this.txtCompany);
        this.txtCompany = sessionStorage.getItem("CompanyName") ?? "";
      }
      if(sessionStorage.getItem("Group")!=null && sessionStorage.getItem("Group")!=this.txtGroup)
        this.txtGroup = sessionStorage.getItem("Group") ?? "";
      else
      {
        sessionStorage.setItem("Group",this.txtGroup);
        this.txtGroup = sessionStorage.getItem("Group") ?? "";
      }
      // if(sessionStorage.getItem("Recos")!=null && sessionStorage.getItem("Recos")!=this.txtRecos)
      //   this.txtRecos = sessionStorage.getItem("Recos") ?? "";
      // else
      // {
      //   sessionStorage.setItem("Recos",this.txtRecos);
      //   this.txtRecos = sessionStorage.getItem("Recos") ?? "";
      // }
      if(sessionStorage.getItem("MinPrice")!=null && sessionStorage.getItem("MinPrice")!=this.minCurrent)
        this.minCurrent = sessionStorage.getItem("MinPrice") ?? "";
      else
      {
        sessionStorage.setItem("MinPrice",this.minCurrent);
        this.minCurrent = sessionStorage.getItem("MinPrice") ?? "";
      }
      if(sessionStorage.getItem("MaxPrice")!=null && sessionStorage.getItem("MaxPrice")!=this.maxCurrent)
        this.maxCurrent = sessionStorage.getItem("MaxPrice") ?? "";
      else
      {
        sessionStorage.setItem("MaxPrice",this.maxCurrent);
        this.maxCurrent = sessionStorage.getItem("MaxPrice") ?? "";
      }
      if(sessionStorage.getItem("Change")!=null && sessionStorage.getItem("Change")!=this.txtChange)
        this.txtChange = sessionStorage.getItem("Change") ?? "";
      else
      {
        sessionStorage.setItem("Change",this.txtChange);
        this.txtChange = sessionStorage.getItem("Change") ?? "";
      }  
      if(sessionStorage.getItem("Search")!=null && sessionStorage.getItem("Search")!=this.txtSearch)
        this.txtSearch = sessionStorage.getItem("Search") ?? "";
      else
      {
        sessionStorage.setItem("Search",this.txtSearch);
        this.txtSearch = sessionStorage.getItem("Search") ?? "";
      }  
    }
  }
}
