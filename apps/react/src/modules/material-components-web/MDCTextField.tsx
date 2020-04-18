import { MDCTextField as MDCTextFieldImport } from '@nicolabello/material-components-web';
import React from 'react';

type Props = { required?: boolean, invalid?: boolean, disabled?: boolean, value?: any } & any;
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
    return this.props.children !== nextProps.childrean
      || this.props.required !== nextProps.required
      || this.props.disabled !== nextProps.disabled
      || this.props.value !== nextProps.value
      || this.props.valid !== nextProps.valid;
  }*/

  public componentDidUpdate(): void {
    if (this.instance) {
      this.instance.required = this.props.required || false;
      this.instance.disabled = this.props.disabled || false;
      if (this.instance.value !== this.props.value) {
        this.instance.value = this.props.value;
      }
      this.instance.valid = !this.props.invalid;
    }
  }

  public componentWillUnmount(): void {
    if (this.instance) {
      this.instance.destroy();
    }
  }

  public render() {
    return (
      <label ref={this.ref} {...this.spreadProps}>{this.props.children}</label>
    );
  }

}

export default MDCTextField;
