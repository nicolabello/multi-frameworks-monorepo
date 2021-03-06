import { MDCSelectProps, updateMDCInstance } from '@feature-toggles/helpers';
import { MDCSelect as MDCSelectImport } from '@nicolabello/material-components-web';
import React from 'react';

type Props = MDCSelectProps & any;
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
    updateMDCInstance(this.instance, this.props as MDCSelectProps);
  }

  public componentWillUnmount(): void {
    this.instance?.unlisten('MDCSelect:change', this.onChange);
    this.instance?.destroy();
  }

  /*public shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    return this.props.children !== nextProps.children
      || this.props.required !== nextProps.required
      || this.props.disabled !== nextProps.disabled
      || this.props.value !== nextProps.value
      || this.props.valid !== nextProps.valid
      || this.props.onChange !== nextProps.onChange;
  }*/

  public render() {
    return (
      <div ref={this.ref} {...this.spreadProps}>{this.props.children}</div>
    );
  }

  private onChange = () => this.props.onChange && this.instance && this.props.onChange(this.instance.value);

}

export default MDCSelect;
