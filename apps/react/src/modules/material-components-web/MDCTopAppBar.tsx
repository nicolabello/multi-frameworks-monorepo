import { MDCTopAppBar as MDCTopAppBarImport } from '@nicolabello/material-components-web';
import React from 'react';

class MDCTopAppBar extends React.Component<any> {

  private ref = React.createRef<HTMLDivElement>();
  private instance: MDCTopAppBarImport | undefined;

  public componentDidMount(): void {
    if (this.ref.current) {
      this.instance = MDCTopAppBarImport.attachTo(this.ref.current);
    }
  }

  public componentWillUnmount(): void {
    if (this.instance) {
      this.instance.destroy();
    }
  }

  public render(): React.ReactNode {
    return (
      <header ref={this.ref} {...this.props}>{this.props.children}</header>
    );
  }

}

export default MDCTopAppBar;
