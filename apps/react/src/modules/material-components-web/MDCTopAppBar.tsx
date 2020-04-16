import { MDCTopAppBar as MDCTopAppBarImport } from '@nicolabello/material-components-web';
import React, { useEffect, useRef } from 'react';

function MDCTopAppBar(props: any) {

  const ref = useRef<HTMLElement>();
  const instance = useRef<MDCTopAppBarImport>();

  const init = () => {
    destroy();
    if (ref.current) {
      instance.current = MDCTopAppBarImport.attachTo(ref.current);
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
    <header ref={ref} {...props}>{props.children}</header>
  );

}

export default MDCTopAppBar;
