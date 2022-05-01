import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeahterIconModule } from '../../../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './product.component';


import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductListComponent } from './list/list.component';
import { ProductAddComponent } from './add/add.component';

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
            }
        ]
    }
]

@NgModule({
    declarations: [ProductComponent, ProductListComponent, ProductAddComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FeahterIconModule,
        NgbAccordionModule,
        NgbDropdownModule,
        NgbTooltipModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ProductModule { }
