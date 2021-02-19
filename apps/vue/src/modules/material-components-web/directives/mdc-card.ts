import { MDCRipple } from '@nicolabello/material-components-web';
import { Directive } from 'vue';

type CustomHTMLElement = HTMLElement & {
  rippleInstance?: MDCRipple;
}

const mdcCard: Directive = {
  mounted: (el: CustomHTMLElement) => {
    const rippleElement = el.querySelector('.mdc-card__primary-action');
    if (rippleElement) {
      el.rippleInstance = MDCRipple.attachTo(rippleElement);
    }
  },
  unmounted: (el: CustomHTMLElement) => {
    el.rippleInstance?.destroy();
  },
};

export default mdcCard;
