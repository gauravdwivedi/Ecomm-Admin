import { Component,OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { environment } from "src/environments/environment";


@Component({
    selector:'app-orders-list',
    templateUrl:'./list.component.html',
    styleUrls:['./list.component.scss']
})


export class OrderListComponent implements OnInit{

orderList:any;
envAPiUrl:any=environment.apiURL;

    constructor(public mainService:MainService){}

    ngOnInit(): void {
        this.mainService.refreshNeeded.subscribe(()=>{
            this.getOrderList()
        })
        this.getOrderList();
    }

    changeOrderStatus(id:string,new_status:string){
            console.log('ID',id,new_status)

            if(confirm(`Are you sure want to change the status to ${new_status}`)){
                const apiURL=`api/v1/orders/change-status`;
                const data={
                    id,status:new_status
                }
                this.mainService.postApi(apiURL,data).subscribe((res:any)=>{
                    console.log(res);
                    //update list here 
                })
            }
    }

    getOrderList(){
        const apiURL =`api/v1/orders/allorders`;
        this.mainService.getApi(apiURL).subscribe((res:any)=>{
            console.log(res.result[0])
            if(res && res.result.length>0){
                this.orderList = res.result;
            }
        })
    }
}