import { MDCTextFieldProps, updateMDCInstance } from '@feature-toggles/helpers';
import { MDCTextField as MDCTextFieldImport } from '@nicolabello/material-components-web';
import React from 'react';

type Props = MDCTextFieldProps & any;
type State = any;

class MDCTextField extends React.Component<Props, State> {

  private ref = React.createRef<HTMLElement>();
  private instance: MDCTextFieldImport | undefined;

  private get spreadProps(): any {
    const props = { ...this.props };
    Object.keys(props).forEach(key => {
      if (typeof props[key] !== 'string') {
        delete props[key];
      }
    });
    return props;
  }

  public componentDidMount(): void {
    if (this.ref.current) {
      this.instance = MDCTextFieldImport.attachTo(this.ref.current);
      this.instance.useNativeValidation = false;
    }
  }

  /*public shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    return this.props.children !== nextProps.children
      || this.props.required !== nextProps.required
      || this.props.disabled !== nextProps.disabled
      || this.props.value !== nextProps.value
      || this.props.valid !== nextProps.valid;
  }*/

  public componentDidUpdate(): void {
    updateMDCInstance(this.instance, this.props as MDCTextFieldProps);
  }

  public componentWillUnmount(): void {
    this.instance?.destroy();
  }

  public render() {
    return (
      <label ref={this.ref} {...this.spreadProps}>{this.props.children}</label>
    );
  }

}

export default MDCTextField;
