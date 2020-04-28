import { MDCSwitch as MDCSwitchImport } from '@nicolabello/material-components-web';
import React from 'react';

class MDCSwitch extends React.Component<any> {

  private ref = React.createRef<HTMLDivElement>();
  private instance: MDCSwitchImport | undefined;

  public componentDidMount(): void {
    if (this.ref.current) {
      this.instance = MDCSwitchImport.attachTo(this.ref.current);
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

export default MDCSwitch;
