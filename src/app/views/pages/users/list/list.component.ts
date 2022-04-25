import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class UsersListComponent implements OnInit {


    usersList: any;

    constructor(public mainService: MainService) { }

    ngOnInit(): void {
        this.getUsersList()
    }
    //getUsersList

    getUsersList() {
        const apiURL = `api/v1/users/list`;

        this.mainService.getApi(apiURL).subscribe((res: any) => {
            console.log(res)
            this.usersList = res;
            console.log(this.usersList)
        })
    }

    delete(userId: number) {
        if (confirm("Are you sure you want to delete it?")) {
            const apiURL = `api/v1/users/deleteUser`;
            this.mainService.deleteApi(apiURL, userId).subscribe((res: any) => {
                console.log(res)
                this.getUsersList();
            })
        }
    }

    changeRole(id: number, role: number) {
        console.log(id, role)

        if (role == 2) {
            role = 1
        } else {

            role = 2
        }

        const data = {
            id,
            role
        }

        if (confirm("Are you sure you want to change the role of this user?")) {
            const apiURL = `api/v1/users/updateUserRole`;
            this.mainService.update(apiURL, data).subscribe((res: any) => {
                console.log(res)
                this.getUsersList();
            })
        }
    }

}