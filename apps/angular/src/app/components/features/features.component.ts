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
  private dataSubscription: Subscription;

  constructor(private featuresService: FeaturesService,
              private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.dataSubscription = this.featuresService.getAll().subscribe(data => {
      this.data = data;
      this.cdr.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}
