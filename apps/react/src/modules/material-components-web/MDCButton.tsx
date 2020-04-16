import { MDCRipple } from '@nicolabello/material-components-web';
import React, { useEffect, useRef } from 'react';

function MDCButton(props: any) {

  const ref = useRef<HTMLElement>();
  const rippleInstance = useRef<MDCRipple>();

  const init = () => {
    destroy();
    if (ref.current) {
      rippleInstance.current = MDCRipple.attachTo(ref.current);
    }
  };
  const destroy = () => {
    rippleInstance.current && rippleInstance.current.destroy();
  };

  useEffect(() => {
    init();
    return destroy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button ref={ref} {...props}>{props.children}</button>
  );

}

export default MDCButton;
