import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.serivce';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton
  ]
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  errorMessage = '';

  validationMessages = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio.' },
      { type: 'minlength', message: 'Debe tener al menos 2 caracteres.' }
    ],
    lastname: [
      { type: 'required', message: 'El apellido es obligatorio.' },
      { type: 'minlength', message: 'Debe tener al menos 2 caracteres.' }
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'email', message: 'Ingresa un email válido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'Debe tener mínimo 6 caracteres.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  async submit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    try {
      await this.authService.registerUser(this.registerForm.value);
      this.errorMessage = '';
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      this.errorMessage = String(error);
    }
  }

  goToLogin(): void {
    this.navCtrl.navigateBack('/login');
  }
}
