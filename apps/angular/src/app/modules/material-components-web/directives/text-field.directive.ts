import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { MDCLineRipple, MDCTextField, MDCFloatingLabel } from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcTextField]',
  exportAs: 'mdcTextField'
})
export class TextFieldDirective implements AfterViewInit, OnDestroy {

  public instance: MDCTextField;
  public lineRippleInstance: MDCLineRipple;
  public floatingLabelInstance: MDCFloatingLabel;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {

    this.instance = MDCTextField.attachTo(this.elementRef.nativeElement);

    const lineRippleElement = this.elementRef.nativeElement.querySelector('.mdc-line-ripple');
    if (lineRippleElement) {
      this.lineRippleInstance = MDCLineRipple.attachTo(lineRippleElement);
    }

    const floatingLabelElement = this.elementRef.nativeElement.querySelector('.mdc-floating-label');
    if (floatingLabelElement) {
      this.floatingLabelInstance = MDCFloatingLabel.attachTo(floatingLabelElement);
    }

  }

  public ngOnDestroy(): void {

    this.instance.destroy();

    if (this.lineRippleInstance) {
      this.lineRippleInstance.destroy();
    }

    if (this.floatingLabelInstance) {
      this.floatingLabelInstance.destroy();
    }

  }

}
