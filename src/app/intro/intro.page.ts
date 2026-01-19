import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.loadStorageData();
  }

  async goBack() {
    console.log('Navegando de vuelta a Home');
    await this.storageService.set('introVisto', true);
    console.log('Intro marcada como vista');
    this.router.navigateByUrl("/home");
  }

  async loadStorageData() {
    const introVisto = await this.storageService.get('introVisto');
    if (introVisto) {
      console.log('Intro ya vista, navegando a Home');
    }
  }
}