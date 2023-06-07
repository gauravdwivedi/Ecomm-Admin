import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { MainService } from 'src/app/provider/main.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  returnUrl: any;
  email: string;
  password: string;
  isSubmitting: boolean = false;
  error: string
  user: UserModel;
  userType:BehaviorSubject<any> =new BehaviorSubject<any>(this.getUserType());

  constructor(private router: Router, private route: ActivatedRoute, public mainService: MainService) { }

  ngOnInit(): void {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getUserType(): any {
    return localStorage.getItem('isAdmin');
  }

  onLoggedin(e: Event) {
    e.preventDefault();

    this.isSubmitting = true;
    

    if (this.isValid()) {
      const params = {
        email: this.email,
        password: this.password
      }

      const apiURL = `api/v1/auth/user/verify`;

      this.mainService.showSpinner();
      this.mainService.postApi(apiURL, params).subscribe({
        next: (v) => {

          console.log('Response', v)

          this.mainService.hideSpinner()

          this.user = this.getUser(v.token)

          if (v.registration == false && v.user.role == 1 || v.registration==false && v.user.role ==3) {

            localStorage.setItem('isLoggedin', 'true')
            localStorage.setItem('hoppedin-admin-token', v.token)
            localStorage.setItem('hoppedin-user', JSON.stringify(v.user))
            
            if(v.user.role==1){
              localStorage.setItem('isAdmin','true');
              this.userType.next(true)
            }

            let isLoggedin = localStorage.getItem('isLoggedin');
            if (isLoggedin) {
              this.router.navigate(['/'])
            }
          }


          if (v.registration == true || v.user.role == 2) {
            this.error = 'Wrong Credentials!'
          }

        },
        error: (e) => {
          console.log(e);
          this.mainService.hideSpinner()
          this.error = e.error.error.message

        },
        complete: () => {
          console.log('complete')
        }
      })
    }

  }


  isValid() {
    return this.email && this.password
  }


  private getUser(token:string):UserModel{
    return JSON.parse(atob(token.split('.')[1])) as UserModel
  }

  


}
