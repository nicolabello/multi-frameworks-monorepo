import { MDCSelectHelperText as MDCSelectHelperTextImport } from '@nicolabello/material-components-web';
import React from 'react';

class MDCSelectHelperText extends React.Component<any> {

  private ref = React.createRef<HTMLDivElement>();
  private instance: MDCSelectHelperTextImport | undefined;

  public componentDidMount(): void {
    if (this.ref.current) {
      this.instance = MDCSelectHelperTextImport.attachTo(this.ref.current);
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

export default MDCSelectHelperText;
