import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  async canActivate() {
    const introVisto = await this.storageService.get('introVisto');
    if (introVisto === true) {
      return true;
    } else {
      return this.router.createUrlTree(['/intro']);
    }
  }
}