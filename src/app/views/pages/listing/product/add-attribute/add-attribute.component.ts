import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from "sweetalert2"
import { InteractionService } from '../../../../../interaction.service'
@Component({
    selector: 'app-add-attribute',
    templateUrl: './add-attribute.component.html',
    styleUrls: ['./add-attribute.component.scss']
})
export class AddAttribute implements OnInit {

    isSubmitting = false;
    price: number;
    size: string;
    color: string;
    detail: any = [];

    constructor(private _interactionService: InteractionService,
        public mainService: MainService) { }

    pricingForm = new FormGroup({
        price: new FormControl('', Validators.required),
        size: new FormControl('', Validators.required),
        color: new FormControl('', Validators.required),
    });

    ngOnInit(): void {

    }

    // fillForm() {
    //     this.pricingForm.patchValue({
    //         price: this.detail['price'],
    //         size: this.detail['size'],
    //         color: this.detail['color'],

    //     });
    // }

    get f() {
        return this.pricingForm.controls;
    }

    submitForm(e: any) {
        e.preventDefault()
        this.isSubmitting = true;

        const formValues: any = this.pricingForm.value
        console.log(formValues)
        let params: any = {
            price: formValues.price,
            size: formValues.size,
            color: formValues.color
        }


        this._interactionService.sendData(params)




    }


}