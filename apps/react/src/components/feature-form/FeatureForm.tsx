import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Feature, FeatureValue } from '../../../../express/src/models/feature';
import MDCButton from '../../modules/material-components-web/MDCButton';
import MDCSelect from '../../modules/material-components-web/MDCSelect';
import MDCSelectHelperText from '../../modules/material-components-web/MDCSelectHelperText';
import MDCTextField from '../../modules/material-components-web/MDCTextField';
import MDCTextFieldHelperText from '../../modules/material-components-web/MDCTextFieldHelperText';
import './FeatureForm.scss';

function FeatureForm(props: { data?: Feature, onCancel: () => any, onSubmit: (values: Feature) => any }) {

  const getFormValues = (): Feature => {
    return {
      _id: props.data?._id || null,
      key: props.data?.key || '',
      description: props.data?.description || '',
      type: props.data?.type || null,
      value: props.data?.value || null
    };
  };

  const form = useFormik<Feature>({
    initialValues: getFormValues(),
    validate: values => {

      const errors: { [key in keyof Feature]?: string } = {};

      if (!values.key) {
        errors.key = 'This is required';
      }

      if (!values.type) {
        errors.type = 'This is required';
        // TODO: this should use featureValueTypes,but it's giving error "imports outside of src/ are not supported"
      } else if (!['string', 'number', 'boolean'].find(item => values.type === item)) {
        errors.type = 'Value not allowed';
      }

      return errors;

    },
    onSubmit: values => props.onSubmit(values)
  });

  const setType = (value: any) => {
    if (form.values.type !== value) {
      form.setFieldValue('type', value);
      updateValue(value);
    }
  };

  const updateValue = (type: any) => {
    const value = form.values.value;
    let newValue: FeatureValue = null;
    switch (type) {
      case 'boolean':
        newValue = typeof value === 'boolean' ? value : value === 'true';
        break;
      case 'number':
        newValue = parseFloat(value as string) || null;
        break;
      case 'string':
        newValue = typeof value !== 'undefined' && value !== null ? `${value}` : '';
        break;
    }
    if (newValue !== value) {
      form.setFieldValue('value', newValue);
    }
  };

  useEffect(() => {
    form.setValues(getFormValues(), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const preview = (): string => JSON.stringify({ [`${form.values.key}`]: form.values.value }, null, 2);

  return (
    <form onSubmit={form.handleSubmit} className="ft-form" noValidate>

      <MDCTextField className="mdc-text-field" required={true} invalid={form.touched.key && !!form.errors.key}
                    value={form.values.key}>
        <span className="mdc-text-field__ripple"/>
        <input aria-controls="key-helper-text-id" aria-describedby="key-helper-text-id" aria-labelledby="key-id"
               className="mdc-text-field__input" type="text" name="key" value={form.values.key}
               onChange={form.handleChange} onBlur={form.handleBlur}
               autoFocus/>
        <span className="mdc-floating-label" id="key-id">Key</span>
        <span className="mdc-line-ripple"/>
      </MDCTextField>
      <div aria-hidden="true" className="mdc-text-field-helper-line" id="key-helper-text-id">
        {form.errors.key ?
          <MDCTextFieldHelperText
            className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">{form.errors.key}</MDCTextFieldHelperText>
          : <MDCTextFieldHelperText className="mdc-text-field-helper-text">This will be used as key in the response
            object</MDCTextFieldHelperText>}
      </div>

      <MDCTextField className="mdc-text-field" invalid={form.touched.description && !!form.errors.description}
                    value={form.values.description}>
        <span className="mdc-text-field__ripple"/>
        <input aria-controls="description-helper-text-id" aria-describedby="description-helper-text-id"
               aria-labelledby="description-id"
               className="mdc-text-field__input" type="text" name="description" value={form.values.description}
               onChange={form.handleChange} onBlur={form.handleBlur}/>
        <span className="mdc-floating-label" id="description-id">Description</span>
        <span className="mdc-line-ripple"/>
      </MDCTextField>
      <div aria-hidden="true" className="mdc-text-field-helper-line" id="description-helper-text-id">
        <MDCTextFieldHelperText
          className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">{form.errors.description}</MDCTextFieldHelperText>
      </div>

      <MDCSelect className="mdc-select" required={true} invalid={form.touched.type && !!form.errors.type}
                 value={form.values.type}
                 onChange={(value: any) => setType(value)}>
        <div className="mdc-select__anchor">
          <span className="mdc-select__dropdown-icon"/>
          <div aria-controls="type-helper-text-id" aria-describedby="type-helper-text-id"
               aria-haspopup="listbox" aria-labelledby="type-label-id type-selected-text-id"
               className="mdc-select__selected-text" id="type-selected-text-id"
               role="button"/>
          <span className="mdc-floating-label" id="type-label-id">Type</span>
          <div className="mdc-line-ripple"/>
        </div>
        <div className="mdc-select__menu mdc-menu mdc-menu-surface" role="listbox">
          <ul className="mdc-list">
            <li className="mdc-list-item" data-value="boolean" role="option" aria-selected="false">Toggle</li>
            <li className="mdc-list-item" data-value="string" role="option" aria-selected="false">String</li>
            <li className="mdc-list-item" data-value="number" role="option" aria-selected="false">Number</li>
          </ul>
        </div>
      </MDCSelect>
      <MDCSelectHelperText aria-hidden="true" className="mdc-select-helper-text mdc-select-helper-text--validation-msg"
                           id="type-helper-text-id">{form.errors.type}</MDCSelectHelperText>

      <pre className="ft-feature-preview">{preview()}</pre>

      <div className="ft-form-controls">

        <div className="mdc-touch-target-wrapper">
          <MDCButton
            onClick={props.onCancel} className="mdc-button" type="button">
            <span className="mdc-button__ripple"/>
            Cancel
          </MDCButton>
        </div>

        <div className="mdc-touch-target-wrapper">
          <MDCButton disabled={!form.isValid} className="mdc-button mdc-button--unelevated" type="submit">
            <span className="mdc-button__ripple"/>
            Save
          </MDCButton>
        </div>

      </div>

    </form>
  );

}

export default FeatureForm;
