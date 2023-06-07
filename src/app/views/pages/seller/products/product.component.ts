import { Component,OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { Router } from "@angular/router";




@Component({
    selector:'app-product-list',
    templateUrl:'./product.component.html',
    styleUrls:['./product.component.scss']
})

export class ProductComponent implements OnInit{

    productList:any;
    icon:any;
    
    constructor(){}

    ngOnInit(): void {
    }

}