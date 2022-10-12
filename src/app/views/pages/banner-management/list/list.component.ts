import { Component,OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import swal from "sweetalert2";


@Component({
    selector:'app-banner-list',
    templateUrl:'./list.component.html',
    styleUrls:['./list.component.scss']
})

export class BannerList implements OnInit{

    bannersList:any;

    constructor(public mainService:MainService){}
    ngOnInit(): void {

        this.mainService.refreshNeeded.subscribe(()=>{
            this.getBannerList()
        })
        this.getBannerList();
    }


    deleteBanner(id:any){
        
        const apiUrl = `api/v1/banners/delete`;
        this.mainService.deleteProduct(apiUrl,id).subscribe((res)=>{
            console.log('Delete Response',res)
        })
    }

    toggleActive(id:any,activeStatus:any){
        
        const apiURL=`api/v1/banners/active`;
        this.mainService.postApi(apiURL,{id,activeStatus:!activeStatus}).subscribe((res)=>{
            console.log('Active',res);
        })
    }

    getBannerList(){
        const apiUrl =`api/v1/banners/list`;

        this.mainService.getApi(apiUrl).subscribe((res:any)=>{
            console.log(res);
          this.bannersList=res?.result;
        })
    }
    
}