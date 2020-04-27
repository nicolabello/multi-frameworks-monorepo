import { MDCRipple } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

type CustomHTMLElement = HTMLElement & {
  rippleInstance?: MDCRipple;
}

const mdcCard: DirectiveOptions = {
  inserted: (el: CustomHTMLElement) => {
    const rippleElement = el.querySelector('.mdc-card__primary-action');
    if (rippleElement) {
      el.rippleInstance = MDCRipple.attachTo(rippleElement);
    }
  },
  unbind: (el: CustomHTMLElement) => {
    el.rippleInstance?.destroy();
  },
};

export default mdcCard;
