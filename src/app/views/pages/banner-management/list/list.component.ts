import { Component,OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";


@Component({
    selector:'app-banner-list',
    templateUrl:'./list.component.html',
    styleUrls:['./list.component.scss']
})

export class BannerList implements OnInit{

    bannersList:any;

    constructor(public mainService:MainService){}
    ngOnInit(): void {
        this.getBannerList();
    }



    getBannerList(){
        const apiUrl =`api/v1/banners/list`;

        this.mainService.getApi(apiUrl).subscribe((res:any)=>{
            console.log(res);
            this.bannersList=res?.result
        })
    }
    
}