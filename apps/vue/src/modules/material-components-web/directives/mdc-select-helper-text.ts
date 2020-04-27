import { MDCSelectHelperText } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

type CustomHTMLElement = HTMLElement & {
  selectHelperTextInstance?: MDCSelectHelperText;
}

const mdcSelectHelperText: DirectiveOptions = {
  inserted: (el: CustomHTMLElement) => {
    el.selectHelperTextInstance = MDCSelectHelperText.attachTo(el);
  },
  unbind: (el: CustomHTMLElement) => {
    el.selectHelperTextInstance?.destroy();
  },
};

export default mdcSelectHelperText;
