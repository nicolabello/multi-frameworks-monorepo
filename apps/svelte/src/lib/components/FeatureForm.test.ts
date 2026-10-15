import { type Feature, FeatureValueType } from '@feature-toggles/helpers';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import FeatureForm from './FeatureForm.svelte';

const feature: Feature = {
  _id: 'id',
  key: 'darkMode',
  description: 'Dark theme',
  type: FeatureValueType.Boolean,
  value: true,
};

describe('FeatureForm', () => {
  it('renders an existing feature and its preview', () => {
    render(FeatureForm, { feature, oncancel: () => {}, onsubmit: () => {} });

    expect(screen.getByLabelText<HTMLInputElement>('Key').value).toBe('darkMode');
    expect(screen.getByRole<HTMLInputElement>('switch').checked).toBe(true);
    expect(screen.getByText(/"darkMode": true/)).toBeTruthy();
  });

  it('disables Save until the form is valid, then submits', async () => {
    const onsubmit = vi.fn();
    render(FeatureForm, { oncancel: () => {}, onsubmit });

    const save = screen.getByRole<HTMLButtonElement>('button', { name: 'Save' });
    expect(save.disabled).toBe(true);

    await fireEvent.input(screen.getByLabelText('Key'), { target: { value: 'limit' } });
    await fireEvent.change(screen.getByLabelText('Type'), { target: { value: 'number' } });
    await fireEvent.input(screen.getByLabelText('Value'), { target: { value: '0' } });

    expect(save.disabled).toBe(false);
    await fireEvent.click(save);

    expect(onsubmit).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'limit', type: 'number', value: 0 }),
    );
  });
});
