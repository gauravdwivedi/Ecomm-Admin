import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { InteractionService } from "src/app/interaction.service";
import { MatAccordion } from "@angular/material/expansion";
import { OwlOptions } from "ngx-owl-carousel-o";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector:'app-order-detail',
    templateUrl:'./detail.component.html',
    styleUrls:['./detail.component.scss']
})

export class OrderDetailComponent implements OnInit{

    id:any='';
    detail:any={};
    address:any=[];



    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private modalService:NgbModal,
        public mainService:MainService){}

    ngOnInit(): void {
            this.id=this.route.snapshot.queryParamMap.get('id');
            this.getOrderDetail();
                        
    }


    getOrderDetail(){
        const apiURL =`api/v1/orders/order-detail/${this.id}`;
        this.mainService.getApi(apiURL).subscribe({
            next:(res)=>{
                this.detail = res?.result;
                this.address=res?.result.address[0];
                console.log(this.detail)

            },
            error:(err)=>{
                console.log('ERROR',err)
            }
        })
    }

}

