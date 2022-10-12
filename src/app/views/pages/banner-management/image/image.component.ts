import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { ActivatedRoute,Route, Router } from "@angular/router";
import { environment } from "src/environments/environment";


@Component({
    selector:'app-banner-image',
    templateUrl:'./image.component.html',
    styleUrls:['./image.component.scss']
})


export class ImageBanner implements OnInit{

url:any;
envApiUrl: any = environment.apiURL


    constructor(
        public mainService:MainService,
        private route:ActivatedRoute
        ){}

    ngOnInit(): void {
        this.url= this.route.snapshot.queryParamMap.get('url');

        console.log(this.url)
    }
}