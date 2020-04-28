import { MDCRipple } from '@nicolabello/material-components-web';
import React from 'react';

class MDCCard extends React.Component<any> {

  private ref = React.createRef<HTMLDivElement>();
  private rippleInstance: MDCRipple | undefined;

  public componentDidMount(): void {
    if (this.ref.current) {
      const rippleElement = this.ref.current.querySelector('.mdc-card__primary-action');
      if (rippleElement) {
        this.rippleInstance = MDCRipple.attachTo(rippleElement);
      }
    }
  }

  public componentWillUnmount(): void {
    this.rippleInstance?.destroy();
  }

  public render(): React.ReactNode {
    return (
      <div ref={this.ref} {...this.props}>{this.props.children}</div>
    );
  }

}

export default MDCCard;
