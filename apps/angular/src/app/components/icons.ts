import { Component } from '@angular/core';

@Component({
  selector: 'ft-arrow-back-icon',
  template: `<svg viewBox="0 0 24 24" class="size-6 fill-current" aria-hidden="true">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>`,
  host: { class: 'contents' },
})
export class ArrowBackIcon {}

@Component({
  selector: 'ft-add-icon',
  template: `<svg viewBox="0 0 24 24" class="size-6 fill-current" aria-hidden="true">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>`,
  host: { class: 'contents' },
})
export class AddIcon {}
