import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";

import { NgbAccordionModule,NgbDropdownModule,NgbTooltipModule,NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TransactionsComponent } from "./transactions.component";
import { TransactionsList } from "./list/list.component";

import { Routes,RouterModule } from "@angular/router";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";



const routes:Routes =[
    {
        path:'',
        component:TransactionsComponent,
        children:[
            {
                path:'',
                redirectTo:'list',
                pathMatch:'full'
            },
            {
                path:'list',
                component:TransactionsList
            }
        ]
    }
]

@NgModule({
    declarations:[TransactionsComponent,TransactionsList],
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

export class TransactionModule { }