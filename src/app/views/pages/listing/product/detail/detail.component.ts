import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { InteractionService } from "src/app/interaction.service";
import { OwlOptions } from "ngx-owl-carousel-o";
import { ThisReceiver } from "@angular/compiler";
@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})


export class ProductDetail implements OnInit {

    envApiUrl: any = environment.apiURL
    title: string;
    rating: number;
    slug: any;
    video_url: string;
    description: string;
    id: any;
    images: any;
    attributes: any;
    category: any;
    status: any;



    constructor(private _interactionService: InteractionService,
        private route: ActivatedRoute,
        public mainService: MainService) {


    }

    ngOnInit(): void {
        // this._interactionService.dataTransfer$.subscribe(data => {
        //     console.log('Data', data)
        //     this.title = data.title
        // })

        this.slug = this.route.snapshot.queryParamMap.get('slug');

        console.log(this.slug)

        this.mainService.refreshNeeded.subscribe(() => {
            this.getProductDetail(this.slug)
        })
        this.getProductDetail(this.slug)
    }


    getProductDetail(slug: string) {
        const apiURL = `api/v1/product/detail?slug=${slug}`;
        this.mainService.getApi(apiURL).subscribe((res: any) => {
            console.log('Detail Response', res.result)
            if (res.status.message == 'success') {
                this.title = res.result.title;
                this.rating = res.result.rating;
                this.slug = res.result.slug;
                this.video_url = res.result.video_url;
                this.description = res.result.description;
                this.id = res.result.id;
                this.images = res.result.images;
                this.attributes = res.result.attributes;
                this.category = res.result.category;
                this.status = res.result.status;
            }
        })

    }


    deleteImage(id: any) {
        const apiURL = `api/v1/product/deleteProductImage`;

        this.mainService.deleteImage(apiURL, id).subscribe((res: any) => {
            console.log(res)
            if (res.status.message == 'success') {

            }
        })
    }

    basicExampleOptions: OwlOptions = {
        loop: true,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    }

}