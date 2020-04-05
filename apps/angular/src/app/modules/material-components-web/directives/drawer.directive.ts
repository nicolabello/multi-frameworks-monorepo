import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { MDCDrawer } from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcDrawer]',
  exportAs: 'mdcDrawer'
})
export class DrawerDirective implements AfterViewInit, OnDestroy {

  public instance: MDCDrawer;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCDrawer.attachTo(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance.destroy();
  }

  public toggle() {
    this.instance.open = !this.instance.open;
  }

}
