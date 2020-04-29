import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { updateMDCInstance } from '@feature-toggles/helpers';
import { MDCSelect } from '@nicolabello/material-components-web';

@Directive({
  selector: '[mdcSelect]',
})
export class SelectDirective implements AfterViewInit, OnChanges, OnDestroy {

  private instance: MDCSelect;

  @Input() private required: boolean;
  @Input() private disabled: boolean;
  @Input() private valid: boolean;
  @Input() private value: any;

  @Output() private onChange = new EventEmitter<string>();

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    this.instance = MDCSelect.attachTo(this.elementRef.nativeElement);
    this.instance.listen('MDCSelect:change', this.emitInstanceValue);
    this.updateMDCInstance();
  }

  public ngOnDestroy(): void {
    this.instance.unlisten('MDCSelect:change', this.emitInstanceValue);
    this.instance.destroy();
  }

  public ngOnChanges(): void {
    this.updateMDCInstance();
  }

  private updateMDCInstance() {
    updateMDCInstance(this.instance, {
      required: this.required,
      disabled: this.disabled,
      valid: this.valid,
      value: this.value,
    });
  }

  private emitInstanceValue = () => {
    this.onChange.emit(this.instance.value);
  };

}
