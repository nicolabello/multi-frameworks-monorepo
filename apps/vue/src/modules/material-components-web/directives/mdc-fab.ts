import { MDCRipple } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

const mdcFab: DirectiveOptions = {
  inserted: (el: HTMLElement) => {
    const element: HTMLElement & { rippleInstance: MDCRipple } = el as any;
    element.rippleInstance = MDCRipple.attachTo(el);
  },
  unbind: (el: HTMLElement) => {
    const element: HTMLElement & { rippleInstance: MDCRipple } = el as any;
    element.rippleInstance && element.rippleInstance.destroy();
  },
};

export default mdcFab;
