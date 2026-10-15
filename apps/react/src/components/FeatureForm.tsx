import {
  castFeatureValue,
  type Feature,
  featurePreview,
  FeatureValueType,
  isFeatureValueType,
  normalizeFeature,
  toInputValue,
  validateFeature,
} from '@feature-toggles/helpers';
import { useFormik } from 'formik';

interface Props {
  feature?: Feature | null;
  onCancel: () => void;
  onSubmit: (feature: Feature) => Promise<void> | void;
}

function FeatureForm({ feature, onCancel, onSubmit }: Props) {
  // Formik keeps the form values, touched fields and errors, and wires up the inputs' handlers.
  // Validation is delegated to the shared `validateFeature` (Formik expects `{}` when there are no errors).
  // https://formik.org/docs/api/useFormik
  const form = useFormik<Feature>({
    initialValues: normalizeFeature(feature),
    validate: (values) => validateFeature(values) ?? {},
    validateOnMount: true,
    onSubmit,
  });

  const { values, errors, touched } = form;
  // Only show an error once the user has left the field
  const showError = (field: keyof Feature) => (touched[field] && errors[field]) || undefined;

  // Changing the type also converts the current value, so both fields are updated together
  const setType = async (type: string) => {
    const newType = isFeatureValueType(type) ? type : null;
    await form.setValues({ ...values, type: newType, value: castFeatureValue(values.value, newType) });
  };

  return (
    <form onSubmit={form.handleSubmit} className="ft-form" noValidate>
      <div className="ft-field">
        <label htmlFor="key" className="ft-label">
          Key
        </label>
        <input
          id="key"
          name="key"
          type="text"
          className="ft-input"
          required
          autoFocus
          aria-invalid={!!showError('key')}
          aria-describedby="key-helper"
          // Controlled input: React state is the single source of truth for its value.
          // https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
          value={values.key}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        <p id="key-helper" className={showError('key') ? 'ft-error' : 'ft-helper'}>
          {showError('key') ?? 'This will be used as key in the response object'}
        </p>
      </div>

      <div className="ft-field">
        <label htmlFor="description" className="ft-label">
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          className="ft-input"
          value={values.description}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
      </div>

      <div className="ft-field">
        <label htmlFor="type" className="ft-label">
          Type
        </label>
        <select
          id="type"
          name="type"
          className="ft-input"
          required
          aria-invalid={!!showError('type')}
          aria-describedby="type-helper"
          value={values.type ?? ''}
          onChange={(event) => setType(event.target.value)}
          onBlur={form.handleBlur}
        >
          <option value="" disabled>
            Select a type…
          </option>
          <option value={FeatureValueType.Boolean}>Toggle</option>
          <option value={FeatureValueType.String}>String</option>
          <option value={FeatureValueType.Number}>Number</option>
        </select>
        {showError('type') && (
          <p id="type-helper" className="ft-error">
            {showError('type')}
          </p>
        )}
      </div>

      {values.type === FeatureValueType.Boolean && (
        <label className="ft-switch">
          <input
            name="value"
            type="checkbox"
            role="switch"
            className="peer sr-only"
            checked={values.value === true}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          <span className="ft-switch-track" />
          Off/On
        </label>
      )}

      {(values.type === FeatureValueType.Number || values.type === FeatureValueType.String) && (
        <div className="ft-field">
          <label htmlFor="value" className="ft-label">
            Value
          </label>
          <input
            id="value"
            name="value"
            type={values.type === FeatureValueType.Number ? 'number' : 'text'}
            className="ft-input"
            aria-invalid={!!showError('value')}
            aria-describedby="value-helper"
            value={toInputValue(values.value)}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {showError('value') && (
            <p id="value-helper" className="ft-error">
              {showError('value')}
            </p>
          )}
        </div>
      )}

      <pre className="ft-preview">{featurePreview(values)}</pre>

      <div className="ft-form-controls">
        <button type="button" className="ft-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="ft-btn ft-btn-primary" disabled={!form.isValid || form.isSubmitting}>
          Save
        </button>
      </div>
    </form>
  );
}

export default FeatureForm;
