import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MDCSelect } from '@nicolabello/material-components-web';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Directive({
  selector: '[mdcSelect]',
  exportAs: 'mdcSelect'
})
export class SelectDirective implements AfterViewInit, OnDestroy {

  public instance: MDCSelect;
  private controlStatusSubscription: Subscription;
  private controlValueSubscription: Subscription;
  @Input('mdcSelect') private control: AbstractControl;
  @Input() private required: boolean;

  constructor(private elementRef: ElementRef<HTMLElement>,
              private cdr: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {

    this.instance = MDCSelect.attachTo(this.elementRef.nativeElement);
    this.instance.required = this.required || false;

    if (this.control) {

      this.controlStatusSubscription = this.control.statusChanges.pipe(
        startWith(this.control.status)
      ).subscribe(() => {
        this.instance.valid = !(this.control.invalid && (this.control.dirty || this.control.touched));
        this.instance.disabled = this.control.disabled;
      });

      this.controlValueSubscription = this.control.valueChanges.pipe(
        startWith(this.control.value)
      ).subscribe(value => {
        if (this.instance.value !== value) {
          this.instance.value = value;
          this.instance.valid = !(this.control.invalid && (this.control.dirty || this.control.touched));
        }
      });

      this.instance.listen('MDCSelect:change', this.updateControlValue);

    }

  }

  public ngOnDestroy(): void {

    this.instance.unlisten('MDCSelect:change', this.updateControlValue);
    this.instance.destroy();

    if (this.controlStatusSubscription) {
      this.controlStatusSubscription.unsubscribe();
    }

    if (this.controlStatusSubscription) {
      this.controlStatusSubscription.unsubscribe();
    }

  }

  private updateControlValue = () => {
    if (this.control.value !== this.instance.value) {
      this.control.setValue(this.instance.value);
      this.control.markAsTouched();
      this.cdr.markForCheck();
    }
  };

}
