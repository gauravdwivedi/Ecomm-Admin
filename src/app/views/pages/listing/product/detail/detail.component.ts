import { Component, OnInit, TemplateRef } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { InteractionService } from "src/app/interaction.service";
import { OwlOptions } from "ngx-owl-carousel-o";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    isSubmitting: false;

    editSize: string;
    editColor: string;
    editQty: number;
    editPrice: number;

    enableEdit: any = false;
    enableEditIndex: any = null;


    constructor(private modalService: NgbModal, private _interactionService: InteractionService,
        private route: ActivatedRoute,
        public mainService: MainService) {


    }
    attributeForm = new FormGroup({
        price: new FormControl('', Validators.required),
        size: new FormControl('', Validators.required),
        color: new FormControl('', Validators.required),
        qty: new FormControl('', Validators.required)
    });

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


    enableEditMethod(e: any, i: any) {
        e.preventDefault();
        // console.log('E', e, 'i', i)
        // this.enableEdit = true;
        // this.enableEditIndex = 1;
        // console.log(i, e)

        this.enableEdit = true
        this.enableEditIndex = i

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

    saveSegment() {

    }

    saveEditAttribute(id: any) {
        console.log(this.editSize)
        console.log(this.editColor)
        console.log(this.editPrice)
        console.log(this.editQty)
        console.log(id)

        const attribute = this.attributes.filter((item: { id: any; }) => item.id === id)

        console.log('ATTRIBUTE', attribute[0].color)

        const params = {
            variantId: id,
            sku: '',
            size: this.editSize || attribute[0].size,
            color: this.editColor || attribute[0].color,
            qty_in_stock: this.editQty || attribute[0].qty_in_stock,
            price: this.editPrice || attribute[0].price,
            discounted_price: this.editPrice || attribute[0].price
        }
        const apiURL = `api/v1/product/updateVariant`;
        this.mainService.postApi(apiURL, params).subscribe((res) => {
            console.log(res)
            this.enableEdit = false
        })

    }

    onChange(item: any) {

    }

    cancelEdit() {
        this.enableEdit = false;
        this.enableEditIndex = null
    }

    openEditAttributes(content: TemplateRef<any>,) {
        this.modalService.open(content, { centered: true }).result.then((result) => {
            console.log("Modal closed" + result);
        }).catch((res) => { });
    }

    deleteImage(id: any) {
        const apiURL = `api/v1/product/deleteProductImage`;

        if (confirm("Delete this image ?")) {
            this.mainService.deleteImage(apiURL, id).subscribe((res: any) => {
                console.log(res)
                if (res.status.message == 'success') {

                }
            })
        }
    }

    get f() {
        return this.attributeForm.controls;
    }

    submitForm(e: any) {
        e.preventDefault()

        const formValues: any = this.attributeForm.value
        console.log(formValues)
        let params: any = {
            price: formValues.price,
            size: formValues.size,
            color: formValues.color,
            qty_in_stock: formValues.qty
        }
        this._interactionService.sendData(params)
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