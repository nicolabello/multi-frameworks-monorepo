import { MDCSelectHelperText } from '@nicolabello/material-components-web';
import { Directive } from 'vue';

type CustomHTMLElement = HTMLElement & {
  selectHelperTextInstance?: MDCSelectHelperText;
}

const mdcSelectHelperText: Directive = {
  mounted: (el: CustomHTMLElement) => {
    el.selectHelperTextInstance = MDCSelectHelperText.attachTo(el);
  },
  unmounted: (el: CustomHTMLElement) => {
    el.selectHelperTextInstance?.destroy();
  },
};

export default mdcSelectHelperText;
