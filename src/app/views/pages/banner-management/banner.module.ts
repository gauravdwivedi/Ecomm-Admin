import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeahterIconModule } from "src/app/core/feather-icon/feather-icon.module";

import { NgbAccordionModule,NgbDropdownModule,NgbTooltipModule,NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { BannerComponent } from "./banner.component";
import { BannerList } from "./list/list.component";

import { Routes,RouterModule } from "@angular/router";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { AddBanner } from "./add/add.component";



const routes: Routes=[
    {
        path:'',
        component:BannerComponent,
        children:[
            {
                path:'',
                redirectTo:'list',
                pathMatch:'full'
            },
            {
                path:'list',
                component:BannerList
            },
            {
                path:'add',
                component:AddBanner
            }
        ]
        
    }
]

@NgModule({
    declarations:[BannerComponent,BannerList,AddBanner],
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

export class BannerModule{}