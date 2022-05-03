import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';

import { MatAccordion } from '@angular/material/expansion';


@Component({
    selector: 'app-product-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class ProductListComponent implements OnInit {

    productList: any;
    envApiUrl: any = environment.apiURL;
    sort_by: any = 'id';
    order: any = 'desc';
    min_price = 0;
    max_price = 50000;
    categoryId: any = '';
    size: any = '';
    color: any = '';
    offset: any = '0';
    limit: any = '20';

    constructor(public mainService: MainService, private router: Router) { }

    ngOnInit(): void {
        this.getProductList()
    }



    getProductList() {
        // const apiURL = `api/v1/product/list?sort_by=${this.sort_by}&order=${this.order}&min_price=${this.min_price}
        // &max_price=${this.max_price}&category_id=${this.categoryId}&size=${this.size}&color=${this.color}&offset=${this.offset}
        // &limit=${this.limit}`

        const apiURL = `api/v1/product/list`;
        this.mainService.getApi(apiURL).subscribe((res: any) => {
            if (res && res.result.length > 0) {
                this.productList = res.result
                console.log(this.productList)
            }
        })

    }

}
