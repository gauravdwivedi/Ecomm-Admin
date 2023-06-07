import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { InteractionService } from "src/app/interaction.service";
import { listenBySelector } from "@fullcalendar/core";



@Component({
    selector:'app-product-list',
    templateUrl:'./list.component.html',
    styleUrls:['./list.component.scss']
})

export class ProductListComponent implements OnInit{



    constructor(){}


    ngOnInit(): void {
        
    }
}