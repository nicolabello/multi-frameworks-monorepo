import { MDCTextFieldHelperText } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

const mdcTextFieldHelperText: DirectiveOptions = {
  inserted: (el: HTMLElement) => {
    const element: HTMLElement & { textFieldHelperTextInstance: MDCTextFieldHelperText } = el as any;
    element.textFieldHelperTextInstance = MDCTextFieldHelperText.attachTo(el);
  },
  unbind: (el: HTMLElement) => {
    const element: HTMLElement & { textFieldHelperTextInstance: MDCTextFieldHelperText } = el as any;
    element.textFieldHelperTextInstance && element.textFieldHelperTextInstance.destroy();
  },
};

export default mdcTextFieldHelperText;
