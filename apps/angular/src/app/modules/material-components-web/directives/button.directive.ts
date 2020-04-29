import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { MDCRipple } from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcButton]',
})
export class ButtonDirective implements AfterViewInit, OnDestroy {

  private rippleInstance: MDCRipple;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.rippleInstance = MDCRipple.attachTo(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.rippleInstance.destroy();
  }

}
