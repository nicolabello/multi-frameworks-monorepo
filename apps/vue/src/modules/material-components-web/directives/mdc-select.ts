import { MDCSelect } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

type CustomHTMLElement = HTMLElement & {
  selectInstance?: MDCSelect;
  selectInstanceOnChange?: () => void;
}

interface BindingValue {
  value?: any;
  required?: boolean;
  valid?: boolean;
  onChange?: (type: string) => void;
}

const updateInstance = (instance?: MDCSelect, data?: BindingValue) => {
  if (instance && data) {
    if ('value' in data) {
      instance.value = data.value;
    }
    instance.valid = !!data.valid;
    instance.required = !!data.required;
  }
};

const mdcSelect: DirectiveOptions = {
  inserted: (el: CustomHTMLElement, binding: DirectiveBinding) => {
    const instance = MDCSelect.attachTo(el);
    el.selectInstance = instance;
    if ('onChange' in binding.value) {
      const selectInstanceOnChange = () => binding.value.onChange(instance.value);
      instance.listen('MDCSelect:change', selectInstanceOnChange);
      el.selectInstanceOnChange = selectInstanceOnChange;
    }
  },
  update: (el: CustomHTMLElement, binding: DirectiveBinding) => {
    updateInstance(el.selectInstance, binding.value);
  },
  unbind: (el: CustomHTMLElement) => {
    if (el.selectInstanceOnChange) {
      el.selectInstance?.unlisten('MDCSelect:change', el.selectInstanceOnChange);
    }
    el.selectInstance?.destroy();
  },
};

export default mdcSelect;
