import { MDCRipple } from '@nicolabello/material-components-web';
import React, { useEffect, useRef } from 'react';

function MDCFab(props: any) {

  const ref = useRef<HTMLElement>();
  const rippleInstance = useRef<MDCRipple>();

  useEffect(() => {
    rippleInstance.current = ref.current && !rippleInstance.current ? MDCRipple.attachTo(ref.current) : rippleInstance.current;
    return () => rippleInstance.current && rippleInstance.current.destroy();
  }, []);

  return (
    <button ref={ref} {...props}>{props.children}</button>
  );

}

export default MDCFab;
