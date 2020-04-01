import { AfterViewInit, Component } from '@angular/core';
import { MDCCheckbox } from '@material/checkbox';


@Component({
  selector: 'ft-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Feature Toggles';

  public ngAfterViewInit(): void {
    const chk = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
  }

}
