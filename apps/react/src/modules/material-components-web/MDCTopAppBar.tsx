import { MDCTopAppBar as MDCTopAppBarImport } from '@nicolabello/material-components-web';
import React, { useEffect, useRef } from 'react';

function MDCTopAppBar(props: any) {

  const ref = useRef<HTMLElement>();
  const instance = useRef<MDCTopAppBarImport>();

  useEffect(() => {
    instance.current = ref.current && !instance.current ? MDCTopAppBarImport.attachTo(ref.current) : instance.current;
    return () => instance.current && instance.current.destroy();
  }, []);

  return (
    <header ref={ref} {...props}>{props.children}</header>
  );

}

export default MDCTopAppBar;
