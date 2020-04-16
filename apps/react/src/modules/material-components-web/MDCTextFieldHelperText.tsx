import { MDCTextFieldHelperText as MDCTextFieldHelperTextImport } from '@nicolabello/material-components-web';
import React, { useEffect, useRef } from 'react';

function MDCTextFieldHelperText(props: any) {

  const ref = useRef<HTMLElement>();
  const instance = useRef<MDCTextFieldHelperTextImport>();

  const init = () => {
    destroy();
    if (ref.current) {
      instance.current = MDCTextFieldHelperTextImport.attachTo(ref.current);
    }
  };
  const destroy = () => {
    instance.current && instance.current.destroy();
  };

  useEffect(() => {
    init();
    return destroy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} {...props}>{props.children}</div>
  );

}

export default MDCTextFieldHelperText;
