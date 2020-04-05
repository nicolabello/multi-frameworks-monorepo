import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Feature } from '~express/models/feature';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'ft-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit {

  public data: Feature;
  private subscriptions = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private featureService: FeatureService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.activatedRoute.params.pipe(
      map(params => params.id),
      distinctUntilChanged(),
      switchMap(id => id === 'new' ? of(null) : this.featureService.get(id))
    ).subscribe(data => {
      this.data = data;
      this.cdr.markForCheck();
    }));
  }

  public addOrUpdate(data: Feature): void {
    if (data._id) {
      this.featureService.update(data).subscribe(() => this.showList());
    } else {
      this.featureService.add(data).subscribe(() => this.showList());
    }
  }

  public showList() {
    this.router.navigate(['/features']);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
