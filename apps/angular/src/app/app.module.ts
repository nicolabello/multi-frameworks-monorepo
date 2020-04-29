import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureFormComponent } from './components/feature-form/feature-form.component';
import { FeatureListItemComponent } from './components/feature-list-item/feature-list-item.component';
import { FeatureComponent } from './components/feature/feature.component';
import { FeaturesListComponent } from './components/features-list/features-list.component';
import { FeaturesComponent } from './components/features/features.component';
import { MaterialComponentsWebModule } from './modules/material-components-web/material-components-web.module';

@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    FeatureComponent,
    FeaturesListComponent,
    FeatureListItemComponent,
    FeatureFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialComponentsWebModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
