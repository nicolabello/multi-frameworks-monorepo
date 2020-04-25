import { MDCTopAppBar } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';

const mdcTopAppBar: DirectiveOptions = {
  inserted: (el: HTMLElement) => {
    const element: HTMLElement & { topAppBarInstance: MDCTopAppBar } = el as any;
    element.topAppBarInstance = MDCTopAppBar.attachTo(el);
  },
  unbind: (el: HTMLElement) => {
    const element: HTMLElement & { topAppBarInstance: MDCTopAppBar } = el as any;
    element.topAppBarInstance && element.topAppBarInstance.destroy();
  },
};

export default mdcTopAppBar;
