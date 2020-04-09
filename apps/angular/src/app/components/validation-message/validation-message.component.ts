import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

interface ValidationError {
  key: string;
  details: { [key: string]: string | number };
}

@Component({
  selector: 'ft-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent {

  public error: ValidationError;
  private readonly errorsKeysByPriority = ['required', 'minlength', 'maxlength'];

  @Input()
  public set errors(value: ValidationErrors) {
    this.error = this.getErrorByPriority(value);
  }

  private getErrorByPriority(errors: ValidationErrors): ValidationError {

    if (errors) {

      for (const key of this.errorsKeysByPriority) {
        if (errors[key]) {
          return {
            key,
            details: errors[key],
          };
        }
      }

      for (const key of Object.keys(errors)) {
        if (errors[key]) {
          return {
            key,
            details: errors[key],
          };
        }
      }

    }

    return null;

  }

}
