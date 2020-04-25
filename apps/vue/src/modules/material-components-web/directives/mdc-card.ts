import { MDCRipple } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

const mdcCard: DirectiveOptions = {
  inserted: (el: HTMLElement) => {
    const element: HTMLElement & { rippleInstance: MDCRipple } = el as any;
    const rippleElement = el.querySelector('.mdc-card__primary-action');
    if (rippleElement) {
      element.rippleInstance = MDCRipple.attachTo(rippleElement);
    }
  },
  unbind: (el: HTMLElement) => {
    const element: HTMLElement & { rippleInstance: MDCRipple } = el as any;
    element.rippleInstance && element.rippleInstance.destroy();
  },
};

export default mdcCard;
