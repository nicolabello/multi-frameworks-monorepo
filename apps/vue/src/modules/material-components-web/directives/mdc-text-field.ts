import { MDCTextField } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

const mdcTextField: DirectiveOptions = {
  inserted: (el: HTMLElement) => {
    const element: HTMLElement & { textFieldInstance: MDCTextField } = el as any;
    element.textFieldInstance = MDCTextField.attachTo(el);
  },
  unbind: (el: HTMLElement) => {
    const element: HTMLElement & { textFieldInstance: MDCTextField } = el as any;
    element.textFieldInstance && element.textFieldInstance.destroy();
  },
};

export default mdcTextField;
