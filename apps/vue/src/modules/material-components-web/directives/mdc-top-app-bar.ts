import { MDCTopAppBar } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

type CustomHTMLElement = HTMLElement & {
  topAppBarInstance?: MDCTopAppBar;
}

const mdcTopAppBar: DirectiveOptions = {
  inserted: (el: CustomHTMLElement) => {
    el.topAppBarInstance = MDCTopAppBar.attachTo(el);
  },
  unbind: (el: CustomHTMLElement) => {
    el.topAppBarInstance?.destroy();
  },
};

export default mdcTopAppBar;
