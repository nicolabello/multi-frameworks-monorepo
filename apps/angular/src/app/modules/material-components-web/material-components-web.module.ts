import { NgModule } from '@angular/core';
import { ButtonDirective } from './directives/button.directive';
import { CardDirective } from './directives/card.directive';
import { FabDirective } from './directives/fab.directive';
import { SelectHelperTextDirective } from './directives/select-helper-text.directive';
import { SelectDirective } from './directives/select.directive';
import { SwitchDirective } from './directives/switch.directive';
import { TextFieldHelperTextDirective } from './directives/text-field-helper-text.directive';
import { TextFieldDirective } from './directives/text-field.directive';
import { TopAppBarDirective } from './directives/top-app-bar.directive';

const directives = [
  TopAppBarDirective,
  FabDirective,
  TextFieldDirective,
  ButtonDirective,
  CardDirective,
  SelectDirective,
  TextFieldHelperTextDirective,
  SelectHelperTextDirective,
  SwitchDirective
];

@NgModule({
  declarations: [...directives],
  exports: [...directives]
})
export class MaterialComponentsWebModule {
}
