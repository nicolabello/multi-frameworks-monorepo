import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Feature } from '~express/models/feature';
import { FeaturesService } from '../../services/features.service';

@Component({
  selector: 'ft-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesComponent implements OnInit, OnDestroy {

  public data: Feature[];
  private subscriptions = new Subscription();

  constructor(private featuresService: FeaturesService,
              private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.featuresService.getAll().subscribe(data => {
      this.data = data;
      this.cdr.markForCheck();
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
