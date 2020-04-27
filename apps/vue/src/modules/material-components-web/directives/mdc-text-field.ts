import { MDCTextField } from '@nicolabello/material-components-web';
import { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

type CustomHTMLElement = HTMLElement & {
  textFieldInstance?: MDCTextField;
}

interface BindingValue {
  value?: any;
  required?: boolean;
  valid?: boolean;
}

const updateInstance = (instance?: MDCTextField, data?: BindingValue) => {
  if (instance && data) {
    if ('value' in data) {
      instance.value = data.value;
    }
    instance.valid = !!data.valid;
    instance.required = !!data.required;
  }
};

const mdcTextField: DirectiveOptions = {
  inserted: (el: CustomHTMLElement) => {
    el.textFieldInstance = MDCTextField.attachTo(el);
    el.textFieldInstance.useNativeValidation = false;
  },
  update: (el: CustomHTMLElement, binding: DirectiveBinding) => {
    updateInstance(el.textFieldInstance, binding.value);
  },
  unbind: (el: CustomHTMLElement) => {
    el.textFieldInstance?.destroy();
  },
};

export default mdcTextField;
