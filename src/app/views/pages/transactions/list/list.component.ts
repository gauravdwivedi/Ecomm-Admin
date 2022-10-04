import { Component,OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";


@Component({
    selector:'app-transactions-list',
    templateUrl:'./list.component.html',
    styleUrls:['./list.component.scss']
})

export class TransactionsList implements OnInit{


    ngOnInit(): void {
        
    }
}