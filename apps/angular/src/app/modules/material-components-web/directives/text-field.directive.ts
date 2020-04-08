import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MDCTextField } from '@nicolabello/material-components-web';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[mdcTextField]',
  exportAs: 'mdcTextField'
})
export class TextFieldDirective implements AfterViewInit, OnDestroy {

  public instance: MDCTextField;
  private controlStatusSubscription: Subscription;
  @Input('mdcTextField') private control: AbstractControl;
  @Input() private required: boolean;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {

    this.instance = MDCTextField.attachTo(this.elementRef.nativeElement);
    this.instance.required = this.required || false;

    if (this.control) {

      this.instance.useNativeValidation = false;

      this.controlStatusSubscription = this.control.statusChanges.subscribe(() => {
        this.instance.valid = !(this.control.invalid && (this.control.dirty || this.control.touched));
        this.instance.disabled = this.control.disabled;
      });

      this.instance.valid = this.control.valid;
      this.instance.disabled = this.control.disabled;

    }

  }

  public ngOnDestroy(): void {

    this.instance.destroy();

    if (this.controlStatusSubscription) {
      this.controlStatusSubscription.unsubscribe();
    }

  }

}
