import { Component,OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { environment } from "src/environments/environment";
import { InteractionService } from "src/app/interaction.service";



@Component({
    selector:'app-orders-edit',
    templateUrl:'./edit.component.html',
    styleUrls:['./edit.component.scss']
})


export class EditOrderComponent implements OnInit{
    data:any={};

    constructor(private interactionService:InteractionService){}

    ngOnInit(): void {
     this.data=this.interactionService.dataTransfer$.subscribe((msg)=>(console.log(msg)))
    }
}