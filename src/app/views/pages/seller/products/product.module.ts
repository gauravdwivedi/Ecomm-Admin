import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgbAccordionModule,NgbDropdownModule,NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";


//import Component
import { ProductComponent } from "./product.component";

import { Routes,RouterModule } from "@angular/router";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { CarouselComponent,CarouselModule } from "ngx-owl-carousel-o";
import { ProductListComponent } from "./list/list.component";



const DEFAULT_PERFECT_SCROLLBAR_CONFIG:PerfectScrollbarConfigInterface={
    suppressScrollX:true
};

const routes:Routes =[
    {
        path:'',
        component:ProductComponent,
        children:[
            {
                path:'',
                redirectTo:'list',
                pathMatch:'full'
            },{
                path:'list',
                component:ProductListComponent
            }
        ]
    
    }
]


@NgModule({
    declarations:[ProductComponent,ProductListComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        FeahterIconModule,
        NgbAccordionModule,
        NgbModule,
        NgbDropdownModule,
        NgbTooltipModule,
        PerfectScrollbarModule,
        FeahterIconModule,
        ReactiveFormsModule,
        FormsModule,
        CarouselModule
    ],
    providers:[
        {
            provide:PERFECT_SCROLLBAR_CONFIG,
            useValue:DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})

export class ProductModule { }