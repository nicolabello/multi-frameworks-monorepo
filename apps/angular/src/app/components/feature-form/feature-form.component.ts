import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Feature } from '~express/models/feature';

@Component({
  selector: 'ft-feature-form',
  templateUrl: './feature-form.component.html',
  styleUrls: ['./feature-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureFormComponent {

  private _data: Feature;

  @Input()
  public set data(value: Feature) {
    this._data = value || {
      _id: null,
      name: null,
      description: null,
      type: null,
      value: null,
      switches: null,
    };
    this.form.reset(this._data);
    this.cdr.markForCheck();
  }

  public get data(): Feature {
    return this._data;
  }

  @Output() public ftSubmit = new EventEmitter<Feature>();
  @Output() public ftCancel = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {
  }

  public form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
  });

  public submit() {
    if (this.form.valid) {
      this.ftSubmit.emit({ ...this.data, ...this.form.value });
    }
  }

  public cancel() {
    this.ftCancel.emit();
  }

}
