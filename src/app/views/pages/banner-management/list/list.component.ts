import { Component,OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";


@Component({
    selector:'app-banner-list',
    templateUrl:'./list.component.html',
    styleUrls:['./list.component.scss']
})

export class BannerList implements OnInit{

    transactionList:any;

    constructor(public mainService:MainService){}
    ngOnInit(): void {
    }


    
}