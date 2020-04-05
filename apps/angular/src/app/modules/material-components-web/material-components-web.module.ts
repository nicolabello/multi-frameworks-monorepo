import { NgModule } from '@angular/core';
import { ButtonDirective } from './directives/button.directive';
import { CardDirective } from './directives/card.directive';
import { DrawerDirective } from './directives/drawer.directive';
import { FabDirective } from './directives/fab.directive';
import { TextFieldDirective } from './directives/text-field.directive';
import { TopAppBarDirective } from './directives/top-app-bar.directive';

const directives = [
  DrawerDirective,
  TopAppBarDirective,
  FabDirective,
  TextFieldDirective,
  ButtonDirective,
  CardDirective
];

@NgModule({
  declarations: [...directives],
  exports: [...directives]
})
export class MaterialComponentsWebModule {
}
