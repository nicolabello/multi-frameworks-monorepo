import { type Feature, FeatureValueType } from '@feature-toggles/helpers';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import FeatureForm from './FeatureForm.tsx';

const feature: Feature = {
  _id: 'id',
  key: 'darkMode',
  description: 'Dark theme',
  type: FeatureValueType.Boolean,
  value: true,
};

describe('FeatureForm', () => {
  it('renders an existing feature and its preview', () => {
    render(<FeatureForm feature={feature} onCancel={() => {}} onSubmit={() => {}} />);

    expect(screen.getByLabelText('Key')).toHaveValue('darkMode');
    expect(screen.getByRole('switch')).toBeChecked();
    expect(screen.getByText(/"darkMode": true/)).toBeInTheDocument();
  });

  it('disables Save until the form is valid, then submits', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<FeatureForm onCancel={() => {}} onSubmit={onSubmit} />);

    const save = screen.getByRole('button', { name: 'Save' });
    await waitFor(() => expect(save).toBeDisabled());

    await user.type(screen.getByLabelText('Key'), 'limit');
    await user.selectOptions(screen.getByLabelText('Type'), 'number');
    await user.type(screen.getByLabelText('Value'), '0');

    await waitFor(() => expect(save).toBeEnabled());
    await user.click(save);

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ key: 'limit', type: 'number', value: 0 }),
        expect.anything(),
      ),
    );
  });
});
