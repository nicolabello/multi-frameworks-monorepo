import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { MDCSwitch } from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcSwitch]',
  exportAs: 'mdcSwitch'
})
export class SwitchDirective implements AfterViewInit, OnDestroy {

  public instance: MDCSwitch;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCSwitch.attachTo(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance.destroy();
  }

}
