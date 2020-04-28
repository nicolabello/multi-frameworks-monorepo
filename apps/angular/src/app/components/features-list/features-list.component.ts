import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Feature } from '@feature-toggles/helpers';

@Component({
  selector: 'ft-features-list',
  templateUrl: './features-list.component.html',
  styleUrls: ['./features-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesListComponent {

  @Input() public data: Feature[];

  public trackById(index: number, item: Feature) {
    return item._id;
  }

}
