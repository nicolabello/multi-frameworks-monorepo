import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy } from '@angular/core';
import { updateMDCInstance } from '@feature-toggles/helpers';
import { MDCTextField } from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcTextField]',
})
export class TextFieldDirective implements AfterViewInit, OnChanges, OnDestroy {

  private instance: MDCTextField;

  @Input() private required: boolean;
  @Input() private disabled: boolean;
  @Input() private valid: boolean;
  @Input() private value: any;

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCTextField.attachTo(this.elementRef.nativeElement);
    this.instance.useNativeValidation = false;
    this.updateMDCInstance()
  }

  public ngOnChanges(): void {
    this.updateMDCInstance();
  }

  public ngOnDestroy(): void {
    this.instance.destroy();
  }

  private updateMDCInstance() {
    updateMDCInstance(this.instance, {
      required: this.required,
      disabled: this.disabled,
      valid: this.valid,
      value: this.value,
    });
  }

}
