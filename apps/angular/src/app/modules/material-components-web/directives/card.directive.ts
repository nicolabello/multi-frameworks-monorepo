import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { MDCRipple } from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcCard]',
  exportAs: 'mdcCard'
})
export class CardDirective implements AfterViewInit, OnDestroy {

  public rippleInstance: MDCRipple;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    const rippleElement = this.elementRef.nativeElement.querySelector('.mdc-card__primary-action');
    if (rippleElement) {
      this.rippleInstance = MDCRipple.attachTo(rippleElement);
    }
  }

  public ngOnDestroy(): void {
    if (this.rippleInstance) {
      this.rippleInstance.destroy();
    }
  }

}
