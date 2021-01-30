import { MDCRipple } from '@nicolabello/material-components-web';
import { Directive } from 'vue';

type CustomHTMLElement = HTMLElement & {
  rippleInstance?: MDCRipple;
}

const mdcFab: Directive = {
  mounted: (el: CustomHTMLElement) => {
    el.rippleInstance = MDCRipple.attachTo(el);
  },
  unmounted: (el: CustomHTMLElement) => {
    el.rippleInstance?.destroy();
  },
};

export default mdcFab;
