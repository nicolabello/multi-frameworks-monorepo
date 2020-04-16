import { MDCRipple } from '@nicolabello/material-components-web';
import React, { useEffect, useRef } from 'react';

function MDCCard(props: any) {

  const ref = useRef<HTMLElement>();
  const rippleInstance = useRef<MDCRipple>();

  const init = () => {
    destroy();
    if (ref.current) {
      const rippleElement = ref.current?.querySelector('.mdc-card__primary-action');
      if (rippleElement) {
        rippleInstance.current = MDCRipple.attachTo(rippleElement);
      }
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
    <div ref={ref} {...props}>{props.children}</div>
  );

}

export default MDCCard;
