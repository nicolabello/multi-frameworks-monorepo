import { MDCTextFieldHelperText as MDCTextFieldHelperTextImport } from '@nicolabello/material-components-web';
import React from 'react';

class MDCTextFieldHelperText extends React.Component<any> {

  private ref = React.createRef<HTMLDivElement>();
  private instance: MDCTextFieldHelperTextImport | undefined;

  public componentDidMount(): void {
    if (this.ref.current) {
      this.instance = MDCTextFieldHelperTextImport.attachTo(this.ref.current);
    }
  }

  public componentWillUnmount(): void {
    this.instance?.destroy();
  }

  public render(): React.ReactNode {
    return (
      <div ref={this.ref} {...this.props}>{this.props.children}</div>
    );
  }

}

export default MDCTextFieldHelperText;
