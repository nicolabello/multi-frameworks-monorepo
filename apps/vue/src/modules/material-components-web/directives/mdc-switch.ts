import { MDCSwitch } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

type CustomHTMLElement = HTMLElement & {
  switchInstance?: MDCSwitch;
}

const mdcSwitch: DirectiveOptions = {
  inserted: (el: CustomHTMLElement) => {
    el.switchInstance = MDCSwitch.attachTo(el);
  },
  unbind: (el: CustomHTMLElement) => {
    el.switchInstance?.destroy();
  },
};

export default mdcSwitch;
