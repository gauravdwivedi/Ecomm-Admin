import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainService } from "src/app/provider/main.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";



@Component({
    selector: 'app-product-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})



export class ProductAddComponent implements OnInit {


    isSubmitting = false;
    id: any = '';


    productForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        video_url: new FormControl('', Validators.required),
        rating: new FormControl('', Validators.required),
        slug: new FormControl('', Validators.required),
        images: new FormControl('', Validators.required),
    })


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public mainService: MainService
    ) { }


    ngOnInit(): void {

    }

    get f() {
        return this.productForm.controls;
    }

    submitForm() {
        // e.preventDefault()


    }


}