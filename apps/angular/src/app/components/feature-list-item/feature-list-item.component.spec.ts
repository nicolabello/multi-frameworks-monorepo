import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeatureListItemComponent } from './feature-list-item.component';

describe('FeatureListItemComponent', () => {
  let component: FeatureListItemComponent;
  let fixture: ComponentFixture<FeatureListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureListItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
