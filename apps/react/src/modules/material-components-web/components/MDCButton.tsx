import { MDCRipple } from '@nicolabello/material-components-web';
import React from 'react';

class MDCButton extends React.Component<any> {

  private ref = React.createRef<HTMLButtonElement>();
  private rippleInstance: MDCRipple | undefined;

  public componentDidMount(): void {
    if (this.ref.current) {
      this.rippleInstance = MDCRipple.attachTo(this.ref.current);
    }
  }

  public componentWillUnmount(): void {
    if (this.rippleInstance) {
      this.rippleInstance.destroy();
    }
  }

  public render(): React.ReactNode {
    return (
      <button ref={this.ref} {...this.props}>{this.props.children}</button>
    );
  }

}

export default MDCButton;
