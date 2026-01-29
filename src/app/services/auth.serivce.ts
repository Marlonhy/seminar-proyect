import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private storageService: StorageService) {}

  async registerUser(user: any): Promise<string> {
    const existingUser = await this.storageService.get('user');

    if (existingUser) {
      return Promise.reject('El usuario ya está registrado');
    }

    await this.storageService.set('user', user);
    return Promise.resolve('Registro exitoso');
  }

  async loginUser(credentials: any): Promise<string> {
    const user = await this.storageService.get('user');

    if (
      user &&
      user.email === credentials.email &&
      user.password === credentials.password
    ) {
      return Promise.resolve('Login correcto');
    }

    return Promise.reject('Email o contraseña incorrectos');
  }

  async logout(): Promise<void> {
    await this.storageService.remove('isLoggedIn');
  }
}
