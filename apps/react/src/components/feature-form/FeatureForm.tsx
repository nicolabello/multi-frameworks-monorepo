import {
  castFeatureValue,
  Feature,
  FeatureValueType,
  normalizeFeature,
  toInputValue,
  validateFeature
} from '@feature-toggles/helpers';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import MDCButton from '../../modules/material-components-web/components/MDCButton';
import MDCSelect from '../../modules/material-components-web/components/MDCSelect';
import MDCSelectHelperText from '../../modules/material-components-web/components/MDCSelectHelperText';
import MDCSwitch from '../../modules/material-components-web/components/MDCSwitch';
import MDCTextField from '../../modules/material-components-web/components/MDCTextField';
import MDCTextFieldHelperText from '../../modules/material-components-web/components/MDCTextFieldHelperText';
import './FeatureForm.scss';

function FeatureForm(props: { data?: Feature, onCancel: () => any, onSubmit: (values: Feature) => any }) {

  const form = useFormik<Feature>({
    initialValues: normalizeFeature(props.data),
    validate: values => validateFeature(values) || {},
    onSubmit: values => props.onSubmit(values)
  });

  const setType = (value: FeatureValueType) => {
    if (form.values.type !== value) {
      form.setFieldValue('type', value);
      updateValue(value);
    }
  };

  const updateValue = (type: FeatureValueType) => {
    const value = form.values.value;
    const newValue = castFeatureValue(value, type);
    if (newValue !== value) {
      form.setFieldValue('value', newValue);
    }
  };

  useEffect(() => {
    form.setValues(normalizeFeature(props.data), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const preview = (): string => JSON.stringify({ [`${form.values.key}`]: form.values.value }, null, 2);

  return (
    <form onSubmit={form.handleSubmit} className="ft-form" noValidate>

      <MDCTextField className="mdc-text-field mdc-text-field--filled" required={true}
                    valid={!form.touched.key || !form.errors.key}
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

      <MDCTextField className="mdc-text-field mdc-text-field--filled"
                    valid={!form.touched.description || !form.errors.description}
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

      <MDCSelect className="mdc-select mdc-select--filled" required={true}
                 valid={!form.touched.type || !form.errors.type}
                 value={form.values.type}
                 onChange={(value: FeatureValueType) => setType(value)}>
        <div className="mdc-select__anchor"
             role="button"
             aria-haspopup="listbox"
             aria-expanded="false"
             aria-labelledby="type-label-id type-selected-text-id">
          <div className="mdc-line-ripple"></div>
          <span className="mdc-floating-label" id="type-label-id">Type</span>
          <span className="mdc-select__selected-text-container">
        <span id="type-selected-text-id" className="mdc-select__selected-text"></span>
      </span>
          <span className="mdc-select__dropdown-icon">
        <span className="mdc-select__dropdown-icon-graphic">
        <span className="mdc-select__dropdown-icon-inactive material-icons">arrow_drop_down</span>
        <span className="mdc-select__dropdown-icon-active material-icons">arrow_drop_up</span>
          </span>
      </span>
        </div>
        <div className="mdc-select__menu mdc-menu mdc-menu-surface" role="listbox">
          <ul className="mdc-list" role="listbox" aria-label="Type">
            <li aria-selected="false" className="mdc-list-item" data-value="boolean" role="option">
              <span className="mdc-list-item__ripple"></span>
              <span className="mdc-list-item__text">Toggle</span>
            </li>
            <li aria-selected="false" className="mdc-list-item" data-value="string" role="option">
              <span className="mdc-list-item__ripple"></span>
              <span className="mdc-list-item__text">String</span>
            </li>
            <li aria-selected="false" className="mdc-list-item" data-value="number" role="option">
              <span className="mdc-list-item__ripple"></span>
              <span className="mdc-list-item__text">Number</span>
            </li>
          </ul>
        </div>
      </MDCSelect>
      <MDCSelectHelperText aria-hidden="true" className="mdc-select-helper-text mdc-select-helper-text--validation-msg"
                           id="type-helper-text-id">{form.errors.type}</MDCSelectHelperText>

      {form.values.type === FeatureValueType.Boolean ?
        <div className="ft-switch" role="presentation">
          <MDCSwitch className="mdc-switch">
            <div className="mdc-switch__track"/>
            <div className="mdc-switch__thumb-underlay">
              <div className="mdc-switch__thumb"/>
              <input aria-checked={form.values.value === true} className="mdc-switch__native-control"
                     id="value-boolean-id"
                     role="switch" type="checkbox" name="value" defaultChecked={form.values.value === true}
                     onChange={form.handleChange} onBlur={form.handleBlur}/>
            </div>
          </MDCSwitch>
          <label htmlFor="value-boolean-id">Off/On</label>
        </div>
        : null}

      {form.values.type === FeatureValueType.Number ?
        <>
          <MDCTextField className="mdc-text-field mdc-text-field--filled"
                        valid={!form.touched.value || !form.errors.value}
                        value={form.values.value}>
            <span className="mdc-text-field__ripple"/>
            <input aria-controls="value-helper-text-id" aria-describedby="value-helper-text-id"
                   aria-labelledby="value-id"
                   className="mdc-text-field__input" type="number" name="value"
                   value={toInputValue(form.values.value)}
                   onChange={form.handleChange} onBlur={form.handleBlur}/>
            <span className="mdc-floating-label" id="value-id">Value</span>
            <span className="mdc-line-ripple"/>
          </MDCTextField>
          <div aria-hidden="true" className="mdc-text-field-helper-line" id="value-helper-text-id">
            <MDCTextFieldHelperText
              className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">{form.errors.value}</MDCTextFieldHelperText>
          </div>
        </>
        : null}

      {form.values.type === FeatureValueType.String ?
        <>
          <MDCTextField className="mdc-text-field mdc-text-field--filled"
                        valid={!form.touched.value || !form.errors.value}
                        value={form.values.value}>
            <span className="mdc-text-field__ripple"/>
            <input aria-controls="value-helper-text-id" aria-describedby="value-helper-text-id"
                   aria-labelledby="value-id"
                   className="mdc-text-field__input" type="text" name="value"
                   value={toInputValue(form.values.value)}
                   onChange={form.handleChange} onBlur={form.handleBlur}/>
            <span className="mdc-floating-label" id="value-id">Value</span>
            <span className="mdc-line-ripple"/>
          </MDCTextField>
          <div aria-hidden="true" className="mdc-text-field-helper-line" id="value-helper-text-id">
            <MDCTextFieldHelperText
              className="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg">{form.errors.value}</MDCTextFieldHelperText>
          </div>
        </>
        : null}

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
