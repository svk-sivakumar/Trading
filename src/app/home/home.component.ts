import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnChanges, AfterViewInit {

  products: any = [];
  url: any='';
  companyAPI: string='';
  companies: any=[];
  companyData: any =[];
  sno:number=1;
  currentYearCompanies: any=[];
  //PrevYear1Companies: any=[];
  //PrevYear2Companies: any=[];
  currentYear:number=2022;
  header = ["et500year","companyId","roce_perc","currentYearRank","previousYearRank","revenue","rev_percent_chg",
  "net_Profit","net_profit_percent_chg","market_cap","mcap_percent_chg"];
  //companyDataNse: Array<any> = [];
  //companyDataBse: Array<any> = [];
 
  // @Input('oneWeekData') oneWeekData:any;
  // @Input('oneMonthData') oneMonthData:any;
  // @Input('threeMonthsData') threeMonthsData:any;
  // @Input('sixMonthsData') sixMonthsData:any;
  // @Input('oneYearData') oneYearData:any;
  // @Input('fiveYearsData') fiveYearsData:any;
  // @Input('companyGainerData') companyGainerData:any;
  @Input('companies') companiesData:any;
  // @Input('companyDataNse') companyDataNse:any;
  // @Input('companyDataBse') companyDataBse:any;
  // @Input('PrevYear1Companies') PrevYear1Companies:any;
  // @Input('PrevYear2Companies') PrevYear2Companies:any;
  tempArray: Array<any> = [];
  companyDelayData: any;
  todayDate: any='';
  historyYearsCnt: number=3;
  oce_perc: number=5;
  minCurrent: number=10;
  maxCurrent: number=1000;
  txtCompany: string = "";
  constructor(private apiService: ApiService, private datePipe: DatePipe) {
    //@Input('oneWeekData') Test;// this.oneWeekData;

    var t1=new Date();
    this.todayDate = this.datePipe.transform(t1,'yyyy-MM-dd');
    this.currentYear = t1.getFullYear()-1;
    
    //this.getGainerData();
   }
  //  filterPrevYear1Function(PrevYear1Companies:any[],companyId:any): any[] { 
  //    console.log(PrevYear1Companies.filter(x=>x.companyId == companyId));
  //   return PrevYear1Companies.filter(x=>x.companyId == companyId);
  // }   
  // filterPrevYear2Function(PrevYear2Companies:any[],companyId:any): any[] { 
  //   console.log(PrevYear2Companies.filter(x=>x.companyId == companyId));
  //  return PrevYear2Companies.filter(x=>x.companyId == companyId);
  // }  
  getCompanyCurrentDataBse(companyDataBse:any[], companyId:any): any{
    console.log(companyDataBse.filter(x=>x.companyId == companyId));
    return companyDataBse.filter(x=>x.companyId == companyId);
  }
  getCompanyCurrentDataNse(companyDataNse:any[], companyId:any): any{
    console.log(companyDataNse.filter(x=>x.companyId == companyId));
    return companyDataNse.filter(x=>x.companyId == companyId);
  }
  getCompanyDelay(data:any[], companyId:any)
  {
    if(data.length>0)
    {
      this.companyDelayData="";
      data.forEach((x:any)=>{
      console.log(x.companyId);
      if(x.companyId == companyId)
        this.companyDelayData=x;
      });  
      return this.companyDelayData.value;    
    }
   
  }
  // getCompanyDelay(data:any[], companyId:any, period:any): any{
  //   if(data.length>0)
  //   {
  //     //this.companyDelayData = data[0].filter(x=>x.companyData.companyID == companyId);
  //     data.forEach((x:any)=>{
  //       console.log(x.companyData.companyID);
  //       if(x.companyData.companyID == companyId)
  //         this.companyDelayData=x;
  //     });
  //     //let companyData=this.tempArray[0].companyData;
  //     if(this.companyDelayData && this.companyDelayData.companyData.companyID==companyId)
  //     {
  //       var cData = this.companyDelayData.quotedata;
  //       if(cData && cData.length>0)
  //       {
  //         this.tempArray=[];
  //         let temp= this.tempArray;
  //         let result = cData.map(function(elem:any){ 
  //           let amt = elem[1];
  //           temp.push(amt); 
  //         });
  //         //result=temp.sort();
  //         result = temp.sort(function(a, b) {
  //           return a - b;
  //         });
  //         console.log(result);
  //         //return result;
  //         if(result)
  //           return period+"->"+result[0]+" - "+result[result.length-1];
  //         else
  //           return period+"-> NA";
  //       }
  //     }
  //   }
  // }  

  // getCurrentYearData(currentYear:number){
    
  //   this.companyAPI="https://etmarketsapis.indiatimes.com/ET_Stats/et500?pagesize=20&pageno=20&sortby=currentYearRank&sortorder=asc&year="+currentYear+"";
  //   console.log(this.companyAPI);
  //   this.apiService.getURL(this.companyAPI).subscribe((data: any)=>{  
  //     console.log(data);  
  //     data=data.searchresult;//.filter((x:any)=>x.currentYearRank>250);
      
  //     if(this.currentYearCompanies.length==0)
  //     {
  //       this.currentYearCompanies = data;
        
  //       this.getCurrentYearData(currentYear-1); 
  //     }
  //     else if(this.PrevYear1Companies.length==0)
  //     {
  //       this.PrevYear1Companies = data;
  //       this.getCurrentYearData(currentYear-1);
  //     }
  //     else if(this.PrevYear2Companies.length==0)
  //     {
  //       this.PrevYear2Companies = data;
  //     }  
  //     if(this.currentYearCompanies.length>0 &&
  //        this.PrevYear1Companies.length>0 &&
  //        this.PrevYear2Companies.length>0)   
  //        {
  //         //this.onlineTrading();
  //         setTimeout(() => {
  //           this.processCompanies();
  //         }, 1000);
          
  //         this.companies = this.currentYearCompanies;
  //        } 

  //        //this.historyYearsCnt--;
  //   }); 
  // }
  // getGainerData()
  // {
  //   var url="https://etmarketsapis.indiatimes.com/ET_Stats/gainers?pagesize=500&pageno=1&sortby=percentchange&sortorder=desc&exchange=nse";
  //   this.apiService.getURL(url).subscribe((data: any)=>{  
  //     console.log(data);  
  //     var result=data.searchresult; 
  //     this.companyGainerData = result;

      
  //     for(const item of result)
  //     {
  //       let nseScripCode = item.nseScripCode;
  //       if(nseScripCode)
  //         this.getCompanyDelayData(item.companyId, nseScripCode);        
  //     }
  //     this.getCurrentYearData(this.currentYear);
  //   });

  // }
  // processCompanies()
  // {
  //   this.currentYearCompanies = this.companiesData;
  //   this.companies = this.currentYearCompanies;
  //   var div = document.querySelector('#Main');
  //   var i=0;
  //   for(const comp of this.currentYearCompanies)
  //   {
  //     //Company Short Data BSE / NSE
  //     let url="https://marketservices.indiatimes.com/marketservices/companyshortdata?companyid="+comp.companyId+"&companytype=equity";
  //     this.apiService.getURL(url).subscribe((data: any)=>{  
  //       console.log(data);  
  //       this.companyDataNse.push(data.nse);
  //       this.companyDataBse.push(data.bse);
  //     });
  //     //url="https://json.bselivefeeds.indiatimes.com/ET_Community/peerperformance?exchange=50&companyid="+comp.companyId+"&pagesize=1&default=true&companytype=equity";
  //     //url="https://etinsights.indiatimes.com/ET_TechnicalIndicator/getPriceBehaviourData?scripCode=RAMCOCEMEQ&period=1d&excludeGlobalMeltdown=false&excludeCovidCrisis=false"
      
  //      //let filterGainerData = this.companyGainerData.filter(x=>x.companyId===comp.companyId);
  //       //this.companyGainerData.push(filterCompanyData);

  //       // let nseScripCode = filterGainerData[0]?.nseScripCode;
  //       // if(nseScripCode)
  //       //   this.getCompanyDelayData(comp.companyId, nseScripCode);
  //     //});
  //     i++;
  //   }

  // }
  // getCompanyDelayData(companyId: any, nseScripCode: any)
  // {
  //     //Company Data for 1 Week
  //     let url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=1w";
  //     this.apiService.getURL(url).subscribe((data: any)=>{  
  //       console.log(data);  
  //       this.oneWeekData.push(data.query.results);
  //     });   

  //     //Company Data for 1 Month
  //     url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=1m";
  //     this.apiService.getURL(url).subscribe((data: any)=>{  
  //       console.log(data);  
  //       this.oneMonthData.push(data.query.results);
  //     });    
      
  //     //Company Data for 3 Months
  //     url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=3m";
  //     this.apiService.getURL(url).subscribe((data: any)=>{  
  //       console.log(data);  
  //       this.threeMonthsData.push(data.query.results);
  //     });   
      
  //     //Company Data for 6 Months
  //     url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=6m";
  //     this.apiService.getURL(url).subscribe((data: any)=>{  
  //       console.log(data);  
  //       this.sixMonthsData.push(data.query.results);
  //     }); 

  //     //Company Data for 1 Year
  //     url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=1y";
  //     this.apiService.getURL(url).subscribe((data: any)=>{  
  //       console.log(data);  
  //       this.oneYearData.push(data.query.results);
  //     });      
      
  //     //Company Data for 5 Years
  //     url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=5y";
  //     this.apiService.getURL(url).subscribe((data: any)=>{  
  //       console.log(data);  
  //       this.fiveYearsData.push(data.query.results);
  //     }); 

  // }
  onlineTrading() { 
    try
    {
      this.companyAPI="https://etmarketsapis.indiatimes.com/ET_Stats/et500?pagesize=10&pageno=20&sortby=currentYearRank&sortorder=asc&year=2021&marketcap=";
      this.apiService.getURL(this.companyAPI).subscribe((data: any)=>{  
        console.log(data);  
        this.companies = data;  
        var above200RanksCompanies = this.companies.searchresult;
        // above200RanksCompanies = above200RanksCompanies.filter(function(x:any)
        // {
        //   //x.currentYearRank>250 && x.roce_perc>14;
        //   return x.roce_perc>14;
        // });
        var i=0;
        for(const comp of above200RanksCompanies)
        {
          let currentYearRank = comp.currentYearRank;
          //if(comp.currentYearRank>=5 || comp.previousYearRank >=5)
          // if(comp.currentYearRank<=200)
          //   continue;
          // if(comp.rev_percent_chg<0 && comp.net_profit_percent_chg<10)
          //   continue;
          i++;
          // if(i==10)
          //   return;
          let companyId = comp.companyId;
          let companyName = comp.companyName.replace('.','');
          let companyType = "equity";
          const companyCurrentDetails = this.getCompanyDetails(companyId,companyName,companyType);
        }
      });       
      console.log('data', this.companyAPI);
    }
    catch(ex) {
      console.error(ex);
    }
    
  }
  getCompanyDetails(companyId:string,companyName:string, companyType:string)
  {
    //https://marketservices.indiatimes.com/marketservices/companyshortdata?companyid=11377&companytype=equity
    let url="https://marketservices.indiatimes.com/marketservices/companyshortdata?companyid="+companyId+"&companytype="+companyType+"";
    this.apiService.getAsync(url)
    //const result: any = await this.apiService.getURL(url).toPromise()
    .then((data)=>{
      this.companyData= data;
      const div = document.querySelector('div');
      if(div!=null)
      {
        const subDiv = document.createElement('div');
        div.appendChild(subDiv);
        
        const lblCompanyName = document.createElement('label');
        lblCompanyName.innerHTML="<span style='padding:5px;font-size:18px !important;'>"+this.sno.toString() +". "+ companyName+"  </span>";
        subDiv.appendChild(lblCompanyName);

        if(this.companyData)
        {
          const lblOpen = document.createElement('label');
          lblOpen.innerHTML=" [BSE/NSE] Open<span style='padding:5px;background-color: lightblue'>"+this.companyData.bse?.open+"/"+this.companyData.nse?.open +"</span>";    
          const lblCurrent = document.createElement('label');
          lblCurrent.innerHTML=" Current<span style='padding:5px;background-color: yellow'>"+this.companyData.bse?.current+"/"+this.companyData.nse?.current+"</span>";
          const lblHigh = document.createElement('label');
          lblHigh.innerHTML=" High<span style='padding:5px;background-color: lightgreen'>"+this.companyData.bse?.high+"/"+this.companyData.nse?.high+"</span>";          
          const lblLow = document.createElement('label');
          lblLow.innerHTML=" Low<span style='padding:5px;background-color: pink'>"+this.companyData.bse?.low+"/"+this.companyData.nse?.low+"</span>";    
          const lblPrev = document.createElement('label');
          lblPrev.innerHTML=" PrevClose<span style='padding:5px;background-color: lightgrey'>"+this.companyData.bse?.previousClose+"/"+this.companyData.nse?.previousClose+"</span>";  
          const lblVolume = document.createElement('label');
          lblVolume.innerHTML=" Volume<span style='padding:5px;background-color: rgb(235, 127, 136)'>"+this.companyData.bse?.volume+"/"+this.companyData.nse?.volume+"</span>";           
          
          // const subDiv = document.createElement('div');
          // div.appendChild(subDiv);
          subDiv.appendChild(lblOpen);
          subDiv.appendChild(lblCurrent);
          subDiv.appendChild(lblHigh);
          subDiv.appendChild(lblLow);
          subDiv.appendChild(lblPrev);
          subDiv.appendChild(lblVolume);

          this.sno++;
        }
       
        

        // const lblSno = document.createElement('label');
        // lblSno.innerHTML=i.toString();
        // subDiv.appendChild(lblSno);   
        const subDiv1 = document.createElement('div');
        div.appendChild(subDiv1);
        // const iframe = document.createElement('iframe');
        // iframe.src = "https://economictimes.indiatimes.com/"+ companyName +"/stocks/companyid-"+ companyId +".cms#recommendations";
        // iframe.setAttribute("style","width:1280px;height:400px");
        // iframe.setAttribute("sandbox","allow-top-navigation");
        // subDiv1.appendChild(iframe);
      }
    });  
    return "Succes";
  }
  ngOnInit(): void {
    
    if(this.companiesData.length>0)
      console.log(this.companiesData);
    //this.onlineTrading();
    // this.apiService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{ 
    //   console.log(res); 
    //   this.products = res.body; 
    //   })     
    
      // this.url ="https://economictimes.indiatimes.com/"+ this.products[0].name+"/stocks/companyid-"+ this.products[0].code+".cms#recommendations";
      // var element: HTMLIFrameElement = document.getElementById("frame1") as HTMLIFrameElement;
      // element.src=this.url;
  }
  ngOnChanges(changes: SimpleChanges){
    if(this.companiesData.length>0)
      console.log(this.companiesData);
    // setTimeout(() => {
      //this.getCurrentYearData(this.currentYear);
    //   this.getCurrentYearData(this.currentYear);
    // }, 1000);
  }
  ngAfterViewInit()
  {
    if(this.companiesData.length>0)
      console.log(this.companiesData);
    // setTimeout(() => {
    //   var test = this.oneWeekData;
    //   if(test)
    //    console.log(test);
    //  //this.processCompanies();
    // }, 1000);

  }
// // this.apiService.get().subscribe((data: any)=>{  
// // 	console.log(data);  
// // 	this.products = data;  
  
// //   this.companies.forEach(function(value:any){
// //     let companyId = value.companyId;
// //     let companyName = value.companyName;

// //     const div = document.querySelector('ET');
// //     if(div!=null)
// //     {
// //       const iframe = document.createElement('iframe');
// //       iframe.src = "https://economictimes.indiatimes.com/"+ companyName +"/stocks/companyid-"+ companyId +".cms#recommendations";
// //       iframe.setAttribute("style","width:1280px;height:400px");
// //       div.appendChild(iframe);
// //     }

// //   });
// // // let frameId="frame";
// // // this.getIframeContent(frameId);
// // }); 
// }
// getIframeContent(frameId:any) {
// var element: HTMLIFrameElement = document.getElementById(frameId) as HTMLIFrameElement;
// var frameObj = 
//     document.getElementById(frameId);
// var frameContent = element.contentWindow?.document.body.innerHTML;
// // var frameContent = frameObj?.
// //     contentWindow?.document.body.innerHTML;
    
// alert("frame content : " + frameContent);
// }
}
