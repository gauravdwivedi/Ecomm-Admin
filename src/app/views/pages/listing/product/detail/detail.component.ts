import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { InteractionService } from "src/app/interaction.service";
import { OwlOptions } from "ngx-owl-carousel-o";
@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})


export class ProductDetail implements OnInit {

    envApiUrl: any = environment.apiURL
    title: string;
    rating: number;
    slug: string;
    video_url: string;
    description: string;
    id: any;
    images: string[] = [];
    attributes: any;


    constructor(private _interactionService: InteractionService,
        private route: ActivatedRoute,
        public mainService: MainService) {



    }

    ngOnInit(): void {
        // this._interactionService.dataTransfer$.subscribe(data => {
        //     console.log('Data', data)
        //     this.title = data.title
        // })

        this.id = this.route.snapshot.queryParamMap.get('id');
        console.log(this.id)

        this.getProductDetail(this.id)
    }


    getProductDetail(id: number) {
        const apiURL = `api/v1/product/detail`;
        this.mainService.getApi(apiURL).subscribe((res: any) => {
            console.log(res)
        })

    }

    basicExampleOptions: OwlOptions = {
        loop: true,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 1
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