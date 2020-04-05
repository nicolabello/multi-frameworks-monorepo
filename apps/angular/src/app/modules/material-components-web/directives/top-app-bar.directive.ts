import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { MDCTopAppBar } from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcTopAppBar]',
  exportAs: 'mdcTopAppBar'
})
export class TopAppBarDirective implements AfterViewInit, OnDestroy {

  public instance: MDCTopAppBar;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCTopAppBar.attachTo(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.instance.destroy();
  }

}
