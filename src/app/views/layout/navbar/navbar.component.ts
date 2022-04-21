import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userProfile: {
    firstName: '',
    lastName: ''
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    let userData: any = localStorage.getItem('hoppedin-user');
    if (userData) {
      userData = JSON.parse(userData);
      if (userData && userData.id) {
        this.userProfile = {
          firstName: userData.firstName,
          lastName: userData.lastName,

        }
      }
    }

  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('hoppedin-admin-token');
    localStorage.removeItem('hoppedin-user');
    if (!localStorage.getItem('hoppedin-admin-token')) {
      this.router.navigate(['/auth/login']);
    }
  }

}
