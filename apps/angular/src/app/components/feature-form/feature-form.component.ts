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
import { FormControl, FormGroup } from '@angular/forms';
import { Feature } from '~express/models/feature';

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
    name: new FormControl(''),
    description: new FormControl(''),
    type: new FormControl(''),
  });

  constructor(private elementRef: ElementRef<HTMLElement>,
              private cdr: ChangeDetectorRef) {
  }

  private _data: Feature;

  public get data(): Feature {
    return this._data;
  }

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
