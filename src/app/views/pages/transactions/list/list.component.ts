import { Component,OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { environment } from "src/environments/environment";


@Component({
    selector:'app-transactions-list',
    templateUrl:'./list.component.html',
    styleUrls:['./list.component.scss']
})

export class TransactionsList implements OnInit{

    transactionList:any;

    constructor(public mainService:MainService){}
    ngOnInit(): void {
        this.getTransactionsList();
    }


    getTransactionsList(){
        const apiURL = `api/v1/orders/transactions/list`;
        this.mainService.getApi(apiURL).subscribe((res:any)=>{
            console.log(res)
            if(res&&res.result){
                this.transactionList=res.result;
            }
        })
    }
}