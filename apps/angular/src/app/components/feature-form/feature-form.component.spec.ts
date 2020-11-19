import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeatureFormComponent } from './feature-form.component';

describe('FeatureDetailsComponent', () => {
  let component: FeatureFormComponent;
  let fixture: ComponentFixture<FeatureFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
