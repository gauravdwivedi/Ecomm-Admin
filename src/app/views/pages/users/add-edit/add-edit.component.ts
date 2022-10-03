import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainService } from "src/app/provider/main.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-user-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss']
})

export class UserAddEditComponent implements OnInit {
    isSubmitting = false;
    id: any = '';
    detail: any = {};
    rolesList = [];


    userForm = new FormGroup({
        // roleId: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        Phone: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required])
    })



    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public mainService: MainService

    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.queryParamMap.get('id');
        this.getUserDetail()

    }

    getUserDetail() {
        const apiURL = `api/v1/users/detail`;

        this.mainService.postApi(apiURL, { userId: this.id }).subscribe({
            next: (res) => {
                console.log('UserDetail', res)
                this.detail = res;
                console.log(this.detail.first_name)
            },
            error: (err) => {
                console.log('ERROR', err)
            }
        })
    }


    get f() {
        return this.userForm.controls;
    }


    submitForm() {
        this.isSubmitting = true;
        const formValues = this.userForm.value;
        console.log('This is Date', this.userForm)



        const apiURL = `api/v1/users/updateUserDetails`
        let params: any = {
            firstName: formValues.firstName || this.detail.first_name,
            lastName: formValues.lastName || this.detail.last_name,
            gender: formValues.gender || this.detail.gender,
            dob: formValues.dob || this.detail.dob,
            phone: parseInt(formValues.Phone || this.detail.phone),
            userId: this.id,
            email: formValues.email || this.detail.email
        }

        this.mainService.updateUser(apiURL, params).subscribe((res: any) => {
            this.router.navigate(['users']);
        })

    }

}

