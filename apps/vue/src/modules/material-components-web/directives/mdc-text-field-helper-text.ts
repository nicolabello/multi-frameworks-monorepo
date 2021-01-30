import { MDCTextFieldHelperText } from '@nicolabello/material-components-web';
import { Directive } from 'vue';

type CustomHTMLElement = HTMLElement & {
  textFieldHelperTextInstance?: MDCTextFieldHelperText;
}

const mdcTextFieldHelperText: Directive = {
  mounted: (el: CustomHTMLElement) => {
    el.textFieldHelperTextInstance = MDCTextFieldHelperText.attachTo(el);
  },
  unmounted: (el: CustomHTMLElement) => {
    el.textFieldHelperTextInstance?.destroy();
  },
};

export default mdcTextFieldHelperText;
