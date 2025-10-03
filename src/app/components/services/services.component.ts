import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'services',
  imports: [NgFor],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = [
    {
      title: 'Paintings',
      description: 'Expressive and vivid paintings that capture emotions, stories, and atmospheres with a unique artistic touch.',
      icon: 'bi-palette'
    },
    {
      title: 'Indian Ink & Dip Pen Drawings',
      description: 'Detailed and intricate drawings created using traditional Indian ink and dip pen techniques.',
      icon: 'bi-brush'
    },
    {
      title: 'Sculptures',
      description: 'Unique sculptures that combine form, texture, and emotion to create tactile works of art.',
      icon: 'bi-box'
    },
    {
      title: 'Graphic Artworks',
      description: 'Handcrafted and digital graphics that blend fine art aesthetics with modern design principles.',
      icon: 'bi-easel'
    },
    {
      title: 'Graphic Design',
      description: 'Professional design services tailored to your brand identity and visual needs.',
      icon: 'bi-pencil'
    },
    {
      title: 'Logo Design',
      description: 'Custom, memorable logos that convey your brand’s values and personality.',
      icon: 'bi-award'
    },
    {
      title: 'Book Covers & Book Design',
      description: 'Creative and impactful book covers and interior layouts that enhance your story.',
      icon: 'bi-book'
    },
    {
      title: 'Business Card Design',
      description: 'Elegant and professional business cards designed to leave a lasting impression.',
      icon: 'bi-person-badge'
    },
    {
      title: 'Flyers & Billboards',
      description: 'Eye-catching marketing designs for flyers, posters, and large-scale billboards.',
      icon: 'bi-megaphone'
    }
  ];
}
