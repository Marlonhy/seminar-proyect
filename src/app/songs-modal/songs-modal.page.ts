import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class SongsModalPage implements OnInit {

  songs: any;
  constructor(private navParams: NavParams, private ModalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    console.log('Songs in modal:', this.songs);
  }

  async selectSong(song:any) {
    console.log('Cancion seleccionada: ', song)
    await this.ModalCtrl.dismiss(song)
  }

  async goBack() {
    this.ModalCtrl.dismiss();
  }
}
