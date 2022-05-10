import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { InteractionService } from 'src/app/interaction.service';
import { MatAccordion } from '@angular/material/expansion';
import { OwlOptions } from 'ngx-owl-carousel-o';


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

    constructor(private _interactionService: InteractionService, public mainService: MainService, private router: Router) { }

    ngOnInit(): void {

        // if (document.querySelector('html')?.getAttribute('dir') === 'rtl') {

        //     this.animationFadeoutExampleOptions.rtl = true;
        //     this.basicExampleOptions.rtl = true;
        // }
        this.mainService.refreshNeeded.subscribe(() => {
            this.getProductList()
        })

        this.getProductList()
    }

    // productDetail(data: any) {
    //     console.log(data)


    //     this._interactionService.sendDetail(data)
    //     this.router.navigateByUrl('/product/detail')
    // }

    // animationFadeoutExampleOptions: OwlOptions = {
    //     animateOut: 'fadeOut',
    //     items: 1,
    //     margin: 30,
    //     stagePadding: 30,
    //     smartSpeed: 450
    // }

    // basicExampleOptions: OwlOptions = {
    //     loop: true,
    //     margin: 10,
    //     nav: false,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         600: {
    //             items: 3
    //         },
    //         1000: {
    //             items: 4
    //         }
    //     }
    // }

    deleteProduct(id: any) {

        const apiUrl = `api/v1/product/deleteProduct`;

        this.mainService.deleteProduct(apiUrl, id).subscribe((res) => {
            console.log(res)
        })
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
