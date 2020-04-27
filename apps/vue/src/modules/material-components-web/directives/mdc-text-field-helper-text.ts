import { MDCTextFieldHelperText } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

type CustomHTMLElement = HTMLElement & {
  textFieldHelperTextInstance?: MDCTextFieldHelperText;
}

const mdcTextFieldHelperText: DirectiveOptions = {
  inserted: (el: CustomHTMLElement) => {
    el.textFieldHelperTextInstance = MDCTextFieldHelperText.attachTo(el);
  },
  unbind: (el: CustomHTMLElement) => {
    el.textFieldHelperTextInstance?.destroy();
  },
};

export default mdcTextFieldHelperText;
