import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Feature, FeatureValueType } from '~express/models/feature';
import { Validators } from '../../helpers/validators';

@Component({
  selector: 'ft-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureFormComponent implements AfterViewInit {

  @Output() public ftSubmit = new EventEmitter<Feature>();
  @Output() public ftCancel = new EventEmitter<void>();

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    type: new FormControl('', [
      Validators.required,
      Validators.inArray(Object.keys(FeatureValueType).map(key => FeatureValueType[key]))
    ]),
    value: new FormControl(''),
    switches: new FormArray([])
  });
  public types = FeatureValueType;

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
      name: null,
      description: null,
      type: null,
      value: null,
      switches: null,
    };
    this._data = value;
    this.form.reset(this._data);
    this.cdr.markForCheck();
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

  private autoFocus() {
    const autofocusElement: HTMLElement = this.elementRef.nativeElement.querySelector('[autofocus]');
    if (autofocusElement) {
      autofocusElement.focus();
    }
  }

}
