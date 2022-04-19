import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SSJ';
  companyGainerData: Array<any> = [];
  oneWeekData: Array<any>= [];
  oneMonthData: Array<any> = [];
  threeMonthsData: Array<any> = [];
  sixMonthsData: Array<any> = [];
  oneYearData: Array<any> = [];
  fiveYearsData: Array<any> = [];
  todayDate: any='';
  currentYear:number=2022;
  companyAPI: string='';
  companies: any=[];
  filterCompany: any;
  companyData: any =[];
  sno:number=1;
  currentYearCompanies: any=[];
  PrevYear1Companies: any=[];
  PrevYear2Companies: any=[];
  companyDataNse: Array<any> = [];
  companyDataBse: Array<any> = [];
  tempArray: Array<any> = [];
  tempStringArray: string ="";
  indexes: any[] = [];
  constructor(private apiService: ApiService, private datePipe: DatePipe) {
    // var url="https://www.5paisa.com/get-top-stock-data/RAMCOCEM";
    //var url="https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20TOTALMARKET";
    //var url="https://api.bseindia.com/BseIndiaAPI/api/GetStkCurrMain/w?flag=Equity&ddlVal1=All&ddlVal2=All&m=0&pgN=1";
    // var url="https://etelection.indiatimes.com/ET_Charts/peercharts?scripcode=RAMCOCEMEQ%2CDALBHARATEQ%2CINDIACEMEQ%2CORIENTCEMEQ&frequency=week&period=3m&scripcodetype=company&exchangeid=50";
    
    // var url="https://etmarketsapis.indiatimes.com/ET_Stats/getAllIndices?pagesize=5000";
    // this.apiService.getURL(url).subscribe((data: any)=>{ 
    //   console.log(data);
    //   data= data.searchresult;
    //   var index = "";
    //   data.map(function(x:any){
    //     if(x.indexId)
    //       index +=","+(x.indexId);
    //   });
    //   this.indexes.push(index.split(','));
    //   this.indexes= this.indexes[0];
    // });


    var t1=new Date();
    this.todayDate = this.datePipe.transform(t1,'yyyy-MM-dd');
    this.currentYear = t1.getFullYear()-1;

    this.getCurrentYearData(this.currentYear);
    
  }
  getCurrentYearData(currentYear:number){
    
    this.companyAPI="https://etmarketsapis.indiatimes.com/ET_Stats/et500?pagesize=500&pageno=1&sortby=currentYearRank&sortorder=asc&year="+currentYear+"";
    console.log(this.companyAPI);
    this.apiService.getURL(this.companyAPI).subscribe((data: any)=>{  
      console.log(data);  
      //data = data.searchresult.filter((x:any)=>x.companyId==='11377');
      data=data.searchresult.filter((x:any)=>x.currentYearRank>=100 
      && x.currentYearRank<=500 && x.roce_perc>7 && x.net_profit_percent_chg>0
      && x.mcap_percent_chg>0);
      //x.net_Profit>=20 && x.net_Profit<=50)
      //x.currentYearRank>256 && x.currentYearRank<260);
      // && x.companyId==='11377');
      if(this.currentYearCompanies.length>0)  
      {
        this.getGainerData('2371');
      }
      if(this.currentYearCompanies.length==0)
      {
        this.currentYearCompanies = data;
        this.companies = this.currentYearCompanies;
        this.getCurrentYearData(currentYear-1); 
      }
      else if(this.PrevYear1Companies.length==0)
      {
        this.PrevYear1Companies = data;
        this.companies.map(function(elem:any){
          data.map(function(x:any){
            if(elem.companyId == x.companyId)
              elem.Prev1YearData = new Array(x);
          });
        });
        this.getCurrentYearData(currentYear-1);
      }
      else if(this.PrevYear2Companies.length==0)
      {
        this.PrevYear2Companies = data;
        this.companies.map(function(elem:any){
          data.map(function(x:any){
            if(elem.companyId == x.companyId)
              elem.Prev2YearData = new Array(x);
          });
        });
      }
   
      if(this.currentYearCompanies.length>0 &&
         this.PrevYear1Companies.length>0 &&
         this.PrevYear2Companies.length>0)   
         {
          
         } 

         //this.historyYearsCnt--;
    }); 
  }
  getGainerData(index: any)
  {
    //var url="https://etmarketsapis.indiatimes.com/ET_Stats/gainers?pagesize=5000&pageno=1&sortby=percentchange&sortorder=desc&exchange=nse";
    var url="https://etmarketsapis.indiatimes.com/ET_Stats/getIndexByIds?pagesize=500&exchange=50&indexid="+index+"&marketcap=&company=true&sortorder=desc&sortby=currentprice";
    this.apiService.getURL(url).subscribe((data: any)=>{  
      console.log(data);  
      var result=data.searchresult[0].companies; 
      var i=0
      for(const company of this.companies)
      {
        
        this.companyGainerData = result;
        // var result = result.map(function(elem:any){ 
        //   if(elem.companyId === company.companyId)
        //     return elem;
        // });
        this.companyGainerData = this.companyGainerData.filter(x=>x.companyId === company.companyId);
        //this.companyGainerData.push(result);
        
        if(this.companyGainerData.length>0)
        {
            //this.companyGainerData.push(this.filterCompany[0]);
            var gainerData=this.companyGainerData[0];
            let nseScripCode = this.companyGainerData[0].nseScripCode;
            if(nseScripCode)
            {
              this.companies.map(function(elem:any){
                if(elem.companyId == gainerData.companyId)
                {
                  elem.nseScripCode = gainerData.nseScripCode;
                  elem.nseScripName = gainerData.nseScripCode.replace('EQ','');
                }
              });              
              //setTimeout(() => {
                this.getCompanyDelayData(company.companyId, nseScripCode, i); 
                i++;
              //}, 2000);
              //this.getMonthPeerChart(company.companyId,nseScripCode);
            }
        }
        else
        {
          
          // data.map(function(x:any){
          //   if(x.indexId)
          //     index +=","+(x.indexId);
          // });
          // this.indexes.forEach((element) => {
          //   if(element!="")
          //     this.getGainerData(element);
          // });
         
        }

        let url="https://marketservices.indiatimes.com/marketservices/companyshortdata?companyid="+company.companyId+"&companytype=equity";
        this.apiService.getURL(url).subscribe((data: any)=>{  
          console.log(data); 
          this.companies.map(function(elem:any){
            if(elem.companyId == data.nse?.companyId)
            {
              elem.nse =  data.nse;
              elem.bse =  data.bse;
            }
          });
        });
      }
    });

  }
  getCompanyDelayData(companyId: any, nseScripCode: any, i:any)
  {
     console.log(i.toString()+" - Started")
      
      //Company Data for 1 Week
      let url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=1w";
      console.log(i.toString()+ url+" - Started")
      this.apiService.getURL(url, i).subscribe((data: any)=>{  
       
        console.log(data);  
        //this.oneWeekData.push(data.query.results);
        var dataFormat = this.buildFormat(data.query.results,'1W');
        if(dataFormat.length>0)
          //this.oneWeekData.push(dataFormat);
          this.companies.map(function(elem:any){
            if(elem.companyId == dataFormat[0].companyId)
            {
              elem.oneWeekData = dataFormat[0].value;
              return;
            }
          });
        
      });   
    
    
      //Company Data for 1 Month
      url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=1m";
      this.apiService.getURL(url).subscribe((data: any)=>{  
       

        console.log(data);  
        //this.oneMonthData.push(data.query.results);
        var dataFormat = this.buildFormat(data.query.results,'1M');
        if(dataFormat.length>0)
        {
          //this.oneMonthData.push(dataFormat);
          this.companies.map(function(elem:any){
            if(elem.companyId == dataFormat[0].companyId)
            {
              elem.oneMonthData = dataFormat[0].value;
              return;
            }
          });
        }
      
      });   
    
    
      //Company Data for 3 Months
      url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=3m";
      this.apiService.getURL(url).subscribe((data: any)=>{  
       
        console.log(data);  
        var dataFormat = this.buildFormat(data.query.results,'3M');
        if(dataFormat.length>0)
        {
          //this.threeMonthsData.push(dataFormat);
          this.companies.map(function(elem:any){
            if(elem.companyId == dataFormat[0].companyId)
            {
              elem.threeMonthsData = dataFormat[0].value;
              return;
            }
          });
        }
        
      });
    
      //Company Data for 6 Months
      url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=6m";
      this.apiService.getURL(url).subscribe((data: any)=>{  
       
        console.log(data);  
        var dataFormat = this.buildFormat(data.query.results,'6M');
        if(dataFormat.length>0)
        {
          //this.sixMonthsData.push(dataFormat);
          this.companies.map(function(elem:any){
            if(elem.companyId == dataFormat[0].companyId)
            {
              elem.sixMonthsData = dataFormat[0].value;
              return;
            }
          });
        }
      
      }); 
    
      //Company Data for 1 Year
      url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=1y";
      this.apiService.getURL(url).subscribe((data: any)=>{ 
       
        console.log(data);  
        var dataFormat = this.buildFormat(data.query.results,'1Y');
        if(dataFormat.length>0)
        {
          //this.oneYearData.push(dataFormat);
          this.companies.map(function(elem:any){
            if(elem.companyId == dataFormat[0].companyId)
            {
              elem.oneYearData = dataFormat[0].value;
              return;
            }
          });
        }
      
      });        
    
      //Company Data for 5 Years
      url="https://etelection.indiatimes.com/ET_Charts/delaycharts?scripcode="+nseScripCode+"&exchangeid=50&datatype=eod&filtertype=eod&tagId="+companyId+"&firstreceivedataid="+this.todayDate+"&lastreceivedataid=&directions=back&scripcodetype=company&uptodataid=&period=5y";
      this.apiService.getURL(url).subscribe((data: any)=>{  
       
          console.log(data);  
          var dataFormat = this.buildFormat(data.query.results,'5Y');
          if(dataFormat.length>0)
          {
            //this.fiveYearsData.push(dataFormat);
            //let company=dataFormat;
            this.companies.map(function(elem:any){
              if(elem.companyId == dataFormat[0].companyId)
              {
                elem.fiveYearsData = dataFormat[0].value;
                return;
              }
            });
          }
        
      }); 
      
  }
  getMonthPeerChart(companyId: any, nseScripCode: any)
  {
      
      let url="https://etelection.indiatimes.com/ET_Charts/peercharts?scripcode="+nseScripCode+"&frequency=month&period=1y&scripcodetype=company&exchangeid=50";
      this.apiService.getURL(url).subscribe((data: any)=>{  
        console.log(data.results[0].quotedata);  
        //this.oneWeekData.push(data.query.results);
        // //var dataFormat = this.buildFormat(data.query.results,'1W');
        // if(dataFormat.length>0)
        //   //this.oneWeekData.push(dataFormat);
        //   this.companies.map(function(elem:any){
        //     if(elem.companyId == dataFormat[0].companyId)
        //       elem.oneWeekData = dataFormat[0].value;
        //   });
      });   

  }
  buildFormat(response: any, period: any)
  {
    var companyId = response.companyData?.companyID;
    var cData = response.quotedata;
    if(companyId && cData && cData.length>0)
    {
      this.tempArray=[];
      let temp= this.tempArray;
      cData.map(function(elem:any){ 
        let amt = elem[1];
        temp.push(amt); 
      });
      //result=temp.sort();
      let result = temp.sort(function(a, b) {
        return a - b;
      });
      console.log(result);

      if(result)
      {
         let arrayVal = {
          "companyId":  companyId,
          "value": result[0]+" - "+result[result.length-1]
         }
        return new Array(arrayVal);
      }
      else
        return new Array();
    }
    else
      return new Array();
  }
}
