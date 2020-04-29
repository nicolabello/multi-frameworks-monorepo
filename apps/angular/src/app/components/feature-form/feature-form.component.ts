import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import {
  castFeatureValue,
  Feature,
  FeatureValueType,
  normalizeFeature,
  validateFeature
} from '@feature-toggles/helpers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ft-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() public ftSubmit = new EventEmitter<Feature>();
  @Output() public ftCancel = new EventEmitter<void>();
  public form = new FormGroup({
    key: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
    value: new FormControl('')
  }, (formGroup: FormGroup): ValidationErrors => validateFeature(formGroup.value));
  public types = FeatureValueType;
  private typeValueSubscription: Subscription;

  constructor(private elementRef: ElementRef<HTMLElement>,
              private cdr: ChangeDetectorRef) {
  }

  private _data: Feature;

  public get data(): Feature {
    return this._data;
  }

  @Input()
  public set data(value: Feature) {
    this._data = normalizeFeature(value);
    this.form.reset(this._data);
    this.cdr.markForCheck();
  }

  public get preview(): string {
    return JSON.stringify({ [`${this.form.value.key}`]: this.form.value.value }, null, 2);
  }

  public ngOnInit(): void {
    this.typeValueSubscription = this.form.get('type').valueChanges.subscribe((type: FeatureValueType) => {
      const control = this.form.get('value');
      const value = control.value;
      const newValue = castFeatureValue(value, type);
      if (newValue !== value) {
        control.setValue(newValue);
      }
    });
  }

  public ngAfterViewInit(): void {
    this.autoFocus();
  }

  public submit(): void {
    if (this.form.valid) {
      this.ftSubmit.emit({ ...this.data, ...this.form.value });
    }
  }

  public cancel(): void {
    this.ftCancel.emit();
  }

  public ngOnDestroy(): void {
    if (this.typeValueSubscription) {
      this.typeValueSubscription.unsubscribe();
    }
  }

  private autoFocus() {
    const autofocusElement: HTMLElement = this.elementRef.nativeElement.querySelector('[autofocus]');
    if (autofocusElement) {
      autofocusElement.focus();
    }
  }

}
