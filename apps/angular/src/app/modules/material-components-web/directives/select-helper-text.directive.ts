import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { MDCSelectHelperText } from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcSelectHelperText]',
  exportAs: 'mdcSelectHelperText'
})
export class SelectHelperTextDirective implements AfterViewInit, OnDestroy {

  public instance: MDCSelectHelperText;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCSelectHelperText.attachTo(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance.destroy();
  }

}
