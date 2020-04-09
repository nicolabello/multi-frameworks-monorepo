import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Feature } from '~express/models/feature';
import { FeatureService } from '../../services/feature.service';

@Component({
  selector: 'ft-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureComponent implements OnInit, OnDestroy {

  public addingNew: boolean;
  public data: Feature;
  private dataSubscription: Subscription;
  private saveSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private featureService: FeatureService,
              private cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.dataSubscription = this.activatedRoute.params.pipe(
      map(params => params.id),
      distinctUntilChanged(),
      tap(id => this.addingNew = id === 'new'),
      switchMap(id => this.addingNew ? of(null) : this.featureService.get(id))
    ).subscribe(data => {
      this.data = data;
      this.cdr.markForCheck();
    });
  }

  public addOrUpdate(data: Feature): void {

    if (this.saveSubscription) {
      this.saveSubscription.unsubscribe();
    }

    const saveObservable = this.addingNew ? this.featureService.add(data) : this.featureService.update(data);
    this.saveSubscription = saveObservable.subscribe(() => this.showList());

  }

  public showList() {
    this.router.navigate(['/features']);
  }

  public ngOnDestroy(): void {

    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }

    if (this.saveSubscription) {
      this.saveSubscription.unsubscribe();
    }

  }

}
