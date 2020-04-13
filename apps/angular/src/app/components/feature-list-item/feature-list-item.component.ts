import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Feature } from '~express/models/feature';

@Component({
  selector: 'ft-feature-list-item',
  templateUrl: './feature-list-item.component.html',
  styleUrls: ['./feature-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureListItemComponent {

  @Input() public data: Feature;

  public get value(): string {
    return JSON.stringify(this.data?.value);
  }

}
