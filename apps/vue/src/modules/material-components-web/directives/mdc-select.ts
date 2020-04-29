import { MDCSelectProps, updateMDCInstance } from '@feature-toggles/helpers';
import { MDCSelect } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

type CustomHTMLElement = HTMLElement & {
  selectInstance?: MDCSelect;
  selectInstanceOnChange?: () => void;
}

const mdcSelect: DirectiveOptions = {
  inserted: (el: CustomHTMLElement, binding: DirectiveBinding) => {
    const instance = MDCSelect.attachTo(el);
    el.selectInstance = instance;
    updateMDCInstance(el.selectInstance, binding.value as MDCSelectProps);
    if (binding.value?.onChange) {
      const selectInstanceOnChange = () => binding.value.onChange(instance.value);
      instance.listen('MDCSelect:change', selectInstanceOnChange);
      el.selectInstanceOnChange = selectInstanceOnChange;
    }
  },
  update: (el: CustomHTMLElement, binding: DirectiveBinding) => {
    updateMDCInstance(el.selectInstance, binding.value as MDCSelectProps);
  },
  unbind: (el: CustomHTMLElement) => {
    el.selectInstanceOnChange && el.selectInstance?.unlisten('MDCSelect:change', el.selectInstanceOnChange);
    el.selectInstance?.destroy();
  },
};

export default mdcSelect;
