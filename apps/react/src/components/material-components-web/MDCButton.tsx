import { MDCRipple } from '@nicolabello/material-components-web';
import React, { useEffect, useRef } from 'react';

function MDCButton(props: any) {

  const ref = useRef<HTMLElement>();
  const rippleInstance = useRef<MDCRipple>();

  useEffect(() => {
    rippleInstance.current = ref.current && !rippleInstance.current ? MDCRipple.attachTo(ref.current) : rippleInstance.current;
    return () => rippleInstance.current ? rippleInstance.current.destroy() : undefined;
  });

  return (
    <button ref={ref} {...props}>{props.children}</button>
  );

}

export default MDCButton;
