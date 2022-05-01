import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
// import { DomSanitizer } from '@angular/platform-browser'


// class ImageSnippet {
//     constructor(public src: string, private domSanitizer: DomSanitizer) { }
// }

@Component({
    selector: 'app-product-list',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})



export class ProductComponent implements OnInit {

    productList: any;

    icon: any;
    categoryId: any;
    error: string;
    ImgUrl: string = '';
    constructor(public mainService: MainService, private router: Router) { }

    ngOnInit(): void {

    }
}