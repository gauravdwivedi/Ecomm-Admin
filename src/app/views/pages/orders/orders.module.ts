import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";

import { NgbAccordionModule,NgbDropdownModule,NgbTooltipModule,NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OrdersComponent} from "./orders.component";
import { OrderListComponent } from "./list/list.component";
import { Routes,RouterModule } from "@angular/router";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { OrderDetailComponent } from "./detail/detail.component";


const routes: Routes=[
    {
        path:'',
        component:OrdersComponent,
        children:[
            {
                path:'',
                redirectTo:'list',
                pathMatch:'full'
            },
            {
                path:'list',
                component:OrderListComponent
            },{
                path:'detail',
                component:OrderDetailComponent
            }
        ]
        
    }
]



@NgModule({
    declarations:[OrdersComponent,OrderListComponent,OrderDetailComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        FeahterIconModule,
        NgbAccordionModule,
        NgbDropdownModule,
        NgbTooltipModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule
    ]
})


export class OrdersModule{}