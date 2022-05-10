import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';

// import { MatAccordion } from '@angular/material/expansion';
// import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})

export class productVideoList implements OnInit {

    productList: any;
    slug: any;

    constructor(public mainService: MainService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.slug = this.route.snapshot.queryParamMap.get('slug');

        this.getProductDetail(this.slug)


    }

    deleteProductVideo(id: any) {

        const apiUrl = `api/v1/product/deleteProductVideo`;
        this.mainService.deleteProduct(apiUrl, id).subscribe((res) => {
            console.log(res)
        })
    }

    getProductDetail(slug: string) {
        const apiURL = `api/v1/product/detail?slug=${slug}`;
        this.mainService.getApi(apiURL).subscribe((res: any) => {
            console.log('Detail Response', res)
            if (res.status.message == 'success') {

                this.productList = res.result.videos;
            }
        })
    }
}
