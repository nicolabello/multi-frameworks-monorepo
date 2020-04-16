import { MDCTextField as MDCTextFieldImport } from '@nicolabello/material-components-web';
import React, { useEffect, useRef } from 'react';

function MDCTextField({ required, invalid, disabled, value, ...props }: { required?: boolean, invalid?: boolean, disabled?: boolean } & any) {

  const ref = useRef<HTMLElement>();
  const instance = useRef<MDCTextFieldImport>();

  const init = () => {
    destroy();
    if (ref.current) {
      instance.current = MDCTextFieldImport.attachTo(ref.current);
      instance.current.useNativeValidation = false;
      instance.current.required = required || false;
      instance.current.disabled = disabled || false;
      instance.current.value = value || '';
      instance.current.valid = !invalid;
    }
  };
  const destroy = () => {
    instance.current && instance.current.destroy();
  };

  useEffect(() => {
    init();
    return destroy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, required, invalid, value]);

  return (
    <label ref={ref} {...props}>{props.children}</label>
  );

}

export default MDCTextField;
