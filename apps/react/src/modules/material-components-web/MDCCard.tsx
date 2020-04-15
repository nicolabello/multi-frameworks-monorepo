import { MDCRipple } from '@nicolabello/material-components-web';
import React, { useEffect, useRef } from 'react';

function MDCCard(props: any) {

  const ref = useRef<HTMLElement>();
  const rippleInstance = useRef<MDCRipple>();

  useEffect(() => {
    const rippleElement = ref.current?.querySelector('.mdc-card__primary-action');
    rippleInstance.current = rippleElement && !rippleInstance.current ? MDCRipple.attachTo(rippleElement) : rippleInstance.current;
    return () => rippleInstance.current && rippleInstance.current.destroy();
  }, []);

  return (
    <div ref={ref} {...props}>{props.children}</div>
  );

}

export default MDCCard;
