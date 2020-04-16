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
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Feature, FeatureValue, FeatureValueType, featureValueTypes } from '~express/models/feature';
import { Validators } from '../../helpers/validators';

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
    key: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    type: new FormControl('', [
      Validators.required,
      Validators.inArray(featureValueTypes)
    ]),
    value: new FormControl('')
  });
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
    value = value || {
      _id: null,
      key: '',
      description: '',
      type: null,
      value: null
    };
    this._data = value;
    this.form.reset(this._data);
    this.cdr.markForCheck();
  }

  public get preview(): string {
    return JSON.stringify({ [`${this.form.value.key}`]: this.form.value.value }, null, 2);
  }

  public ngOnInit(): void {
    this.typeValueSubscription = this.form.get('type').valueChanges.subscribe((type: FeatureValueType) => {
      const value = this.form.get('value').value;
      let newValue: FeatureValue;
      switch (type) {
        case FeatureValueType.Boolean:
          newValue = typeof value === 'boolean' ? value : value === 'true';
          break;
        case FeatureValueType.Number:
          newValue = parseFloat(value) || null;
          break;
        case FeatureValueType.String:
          newValue = typeof value !== 'undefined' && value !== null ? `${value}` : '';
          break;
      }
      if (newValue !== value) {
        this.form.get('value').setValue(newValue);
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
