import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit, AfterViewInit {
  @ViewChild('swiperRef') swiperRef: any;

  colorClaro = 'var(--tema-claro)';
  colorOscuro = 'var(--tema-oscuro)';
  colorActual = this.colorOscuro;
  textoActual = this.colorClaro;
  isLastSlide = false;
  swiperInstance: any;

  onboardings = [
    {
      title: "Bienvenido a la App de Géneros Musicales",
      image: "assets/onboarding/bienvenido.jpg",
      description: "Explora y descubre diversos géneros musicales con nuestra aplicación interactiva."
    },
    {
      title: "Toda la Información que Necesitas",
      image: "assets/onboarding/informacion.jpg",
      description: "Encuentra descripciones detalladas, imágenes y más sobre tus géneros musicales favoritos."
    },
    {
      title: "",
      image: "assets/onboarding/empezamos.jpg",
      description: "¡Comienza tu aventura musical!"
    }
  ];

  constructor(private router: Router, private storageService: StorageService, private cdr: ChangeDetectorRef, private ngZone: NgZone) { }

  ngOnInit() {
    this.loadStorageData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initSwiper();
    }, 500);
  }

  initSwiper() {
    const swiperContainer = this.swiperRef?.nativeElement;
    if (swiperContainer && swiperContainer.swiper) {
      this.swiperInstance = swiperContainer.swiper;
      this.updateButtonVisibility();
      
      this.swiperInstance.on('slideChange', () => {
        this.ngZone.run(() => {
          this.updateButtonVisibility();
        });
      });
    }
  }

  async goBack() {
    console.log('Navegando de vuelta a Home');
    await this.storageService.set('introVisto', true);
    console.log('Intro marcada como vista');
    this.router.navigateByUrl("/menu/home");
  }

  async loadStorageData() {
    const introVisto = await this.storageService.get('introVisto');
    if (introVisto) {
      console.log('Intro ya vista, navegando a Home');
    }
  }

  updateButtonVisibility() {
    if (this.swiperInstance) {
      const totalSlides = this.swiperInstance.slides.length;
      const currentSlide = this.swiperInstance.activeIndex;
      this.isLastSlide = currentSlide === totalSlides - 1;
      console.log(`Slide: ${currentSlide}, Total: ${totalSlides}, isLastSlide: ${this.isLastSlide}`);
      this.cdr.markForCheck();
    }
  }
}