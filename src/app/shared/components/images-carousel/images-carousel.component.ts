import { TitleCasePipe } from '@angular/common';
import { Component, effect, input, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export interface Image {
  key?: string,
  value?: any
}


@Component({
  selector: 'images-carousel',
  templateUrl: './images-carousel.component.html',
  styleUrls: ['./images-carousel.component.css'],
  imports:[TitleCasePipe],
  // styles: `
  //   .swiper {
  //     width: 30%;
  //     height: 50%;
  //   }
  // `,
})
export class ImagesCarouselComponent {
  images = input.required<Image[]>();

  swiperEffect = effect(() => {
    const imgs = this.images();
    if (imgs.length === 0) return;

    const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: false,
      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
  )

}
