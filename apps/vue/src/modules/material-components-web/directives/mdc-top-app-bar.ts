import { MDCTopAppBar } from '@nicolabello/material-components-web';
import { Directive } from 'vue';

type CustomHTMLElement = HTMLElement & {
  topAppBarInstance?: MDCTopAppBar;
}

const mdcTopAppBar: Directive = {
  mounted: (el: CustomHTMLElement) => {
    el.topAppBarInstance = MDCTopAppBar.attachTo(el);
  },
  unmounted: (el: CustomHTMLElement) => {
    el.topAppBarInstance?.destroy();
  },
};

export default mdcTopAppBar;
