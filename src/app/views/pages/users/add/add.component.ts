import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainService } from "src/app/provider/main.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-add-user',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})

export class UserAdd implements OnInit {
    isSubmitting = false;
    id: any = '';
    detail: any = {};
    rolesList = [];
    role:number;

    userForm = new FormGroup({
        // roleId: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        Phone: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        dob: new FormControl('', [Validators.required]),
        role:new FormControl('',[Validators.required])
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
        return this.userForm.controls;
    }


    selectRole(role:number){

        this.role=role;
    }

    submitForm() {
        this.isSubmitting = true;
        const formValues = this.userForm.value;
        
        const apiURL = `api/v1/users/add-user`;
        let params: any = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password,
            phone: formValues.Phone,
            gender: formValues.gender,
            role:formValues.role,
            dob: formValues.dob,
            status: 1
        }

        console.log('Form Values',params)

            this.mainService.postApi(apiURL, params).subscribe((res: any) => {
                this.router.navigate(['users']);
            })
        
           
        
       

    }

}

