import { MDCSwitch } from '@nicolabello/material-components-web';
import { Directive } from 'vue';

type CustomHTMLElement = HTMLElement & {
  switchInstance?: MDCSwitch;
}

const mdcSwitch: Directive = {
  mounted: (el: CustomHTMLElement) => {
    el.switchInstance = MDCSwitch.attachTo(el);
  },
  unmounted: (el: CustomHTMLElement) => {
    el.switchInstance?.destroy();
  },
};

export default mdcSwitch;
