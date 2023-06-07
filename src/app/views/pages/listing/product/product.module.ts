import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeahterIconModule } from '../../../../core/feather-icon/feather-icon.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product.component';


import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//components
import { ProductListComponent } from './list/list.component';
import { ProductAddComponent } from './add/add.component';
import { AddAttribute } from './add-attribute/add-attribute.component'
// import { ProductList } from './product-list/product-list.component';
import { productVideoList } from './product-list/product-list.component';
import { ProductVideoList } from './video/video.component'
import { ProductDetail } from "./detail/detail.component"
import { EditProduct } from './edit/edit.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

const routes: Routes = [
    {
        path: '',
        component: ProductComponent,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: ProductListComponent
            },
            {
                path: 'add',
                component: ProductAddComponent
            },
            {
                path: 'add-attribute',
                component: AddAttribute
            }
            , {
                path: 'detail',
                component: ProductDetail
            },
            {
                path: 'edit',
                component: EditProduct
            }, {
                path: 'video',
                component: ProductVideoList
            },
            {
                path: 'video-list',
                component: productVideoList
            }
        ]
    }
]

@NgModule({
    declarations: [ProductComponent, ProductVideoList, productVideoList, ProductDetail, ProductListComponent, ProductAddComponent, AddAttribute, EditProduct],
    imports: [
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
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class ProductModule { }
