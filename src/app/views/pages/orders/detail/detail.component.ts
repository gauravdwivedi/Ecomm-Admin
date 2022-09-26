import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { InteractionService } from "src/app/interaction.service";
import { MatAccordion } from "@angular/material/expansion";
import { OwlOptions } from "ngx-owl-carousel-o";


@Component({
    selector:'app-order-detail',
    templateUrl:'./detail.component.html',
    styleUrls:['./detail.component.scss']
})

export class OrderDetailComponent implements OnInit{




    constructor(public mainService:MainService){}

    ngOnInit(): void {
        
    }

}

