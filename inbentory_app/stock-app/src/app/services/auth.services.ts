import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private role: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(email: string, password: string) {
    return this.http.post<any>('/api/auth/login', { email, password });
  }

  setRole(role: string) {
    this.role = role;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userRole', role);
    }
  }

  getRole() {
    if (this.role) return this.role;
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userRole') || '';
    }
    return '';
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userToken');
    }
    this.role = '';
    this.router.navigate(['/login']);
  }
}