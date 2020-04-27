import { MDCSelect as MDCSelectImport } from '@nicolabello/material-components-web';
import React from 'react';

type Props =
  { required?: boolean, invalid?: boolean, disabled?: boolean, value?: any, onChange?: (value: any) => any }
  & any;
type State = any;

class MDCSelect extends React.Component<Props, State> {

  private ref = React.createRef<HTMLElement>();
  private instance: MDCSelectImport | undefined;

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
      this.instance = MDCSelectImport.attachTo(this.ref.current);
      this.instance.listen('MDCSelect:change', this.onChange);
    }
  }

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

  /*public shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    return this.props.children !== nextProps.childrean
      || this.props.required !== nextProps.required
      || this.props.disabled !== nextProps.disabled
      || this.props.value !== nextProps.value
      || this.props.valid !== nextProps.valid
      || this.props.onChange !== nextProps.onChange;
  }*/

  public componentWillUnmount(): void {
    if (this.instance) {
      this.instance.unlisten('MDCSelect:change', this.onChange);
      this.instance.destroy();
    }
  }

  public render() {
    return (
      <div ref={this.ref} {...this.spreadProps}>{this.props.children}</div>
    );
  }

  private onChange = () => this.props.onChange && this.instance && this.props.onChange(this.instance.value);

}

export default MDCSelect;
