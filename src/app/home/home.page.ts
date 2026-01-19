import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {

  colorClaro = 'var(--tema-claro)';
  colorOscuro = 'var(--tema-oscuro)';
  colorActual = this.colorOscuro;
  textoActual = this.colorClaro;

  genres = [
    {
      title: "Música Clásica",
      image: "https://venezuelasinfonica.com/wp-content/uploads/2016/01/mclasica.jpg",
      description: "La música clásica es un género musical que abarca un amplio período de tiempo y se caracteriza por su complejidad estructural y riqueza melódica. Surgió en Europa durante la Edad Media y ha evolucionado a lo largo de los siglos, incluyendo períodos como el Barroco, el Clasicismo y el Romanticismo. Compositores destacados como Johann Sebastian Bach, Wolfgang Amadeus Mozart y Ludwig van Beethoven han dejado un legado duradero en la música clásica. Este género se interpreta principalmente en conciertos y óperas, y sigue siendo apreciado por su belleza y profundidad emocional."
    },
    {
      title: "Hip Hop",
      image: "https://lirp.cdn-website.com/e00ccc9d/dms3rep/multi/opt/LL-Cool-J-2-652x435-0fb36927-1920w.jpg",
      description: "El hip hop es un género musical y una cultura que se originó en las comunidades afroamericanas y latinas de Nueva York en la década de 1970. Se caracteriza por su ritmo pegajoso, letras rítmicas y la utilización de técnicas como el rap, el scratching y el sampling. El hip hop no solo es un estilo musical, sino también una forma de expresión cultural que abarca elementos como el graffiti, el breakdance y la moda urbana. A lo largo de los años, el hip hop ha evolucionado y se ha diversificado, convirtiéndose en uno de los géneros musicales más influyentes y populares a nivel mundial."
    },
    {
      title: "Trap",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRRFIz2T5uxrD5yVEaxblI0PEZW7GixtmWSw&s",
      description: "EL trap es un subgénero del hip hop que se originó en el sur de Estados Unidos a principios de la década de 2000. Se caracteriza por sus ritmos pesados, líneas de bajo prominentes y letras que a menudo abordan temas relacionados con la vida en los barrios marginales, el tráfico de drogas y la lucha por el éxito. El trap ha ganado popularidad en todo el mundo y ha influido en otros géneros musicales, convirtiéndose en una parte importante de la cultura musical contemporánea."
    }
  ];
  constructor(private router: Router, private storageService: StorageService) { }

  async ngOnInit() {
    await this.loadStorageData();
  }

  async goBack() {
    console.log('Navegando a intro');
    this.router.navigateByUrl("/intro");
  }

  async cambiarTema(){
    this.colorActual = this.colorActual === this.colorOscuro ? this.colorClaro : this.colorOscuro;

    this.textoActual = this.textoActual === this.colorClaro ? this.colorOscuro : this.colorClaro;

    await this.storageService.set('theme', this.colorActual);
    console.log('Tema guardado:', this.colorActual);
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
      this.textoActual = this.colorActual === this.colorOscuro ? this.colorClaro : this.colorOscuro;
      console.log('Tema cargado desde almacenamiento:', this.colorActual);
    }
  }
}
