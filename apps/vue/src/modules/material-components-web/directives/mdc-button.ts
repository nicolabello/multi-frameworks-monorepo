import { MDCRipple } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

type CustomHTMLElement = HTMLElement & {
  rippleInstance?: MDCRipple;
}

const mdcButton: DirectiveOptions = {
  inserted: (el: CustomHTMLElement) => {
    el.rippleInstance = MDCRipple.attachTo(el);
  },
  unbind: (el: CustomHTMLElement) => {
    el.rippleInstance?.destroy();
  },
};

export default mdcButton;
