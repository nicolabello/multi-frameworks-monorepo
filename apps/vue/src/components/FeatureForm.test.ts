import { type Feature, FeatureValueType } from '@feature-toggles/helpers';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FeatureForm from './FeatureForm.vue';

const feature: Feature = {
  _id: 'id',
  key: 'darkMode',
  description: 'Dark theme',
  type: FeatureValueType.Boolean,
  value: true,
};

describe('FeatureForm', () => {
  it('renders an existing feature and its preview', () => {
    const wrapper = mount(FeatureForm, { props: { feature } });

    expect((wrapper.get('#key').element as HTMLInputElement).value).toBe('darkMode');
    expect((wrapper.get('[role="switch"]').element as HTMLInputElement).checked).toBe(true);
    expect(wrapper.get('.ft-preview').text()).toContain('"darkMode": true');
  });

  it('disables Save until the form is valid, then emits submit', async () => {
    const wrapper = mount(FeatureForm);
    const save = wrapper.get('button[type="submit"]');
    expect(save.attributes('disabled')).toBeDefined();

    await wrapper.get('#key').setValue('limit');
    await wrapper.get('#type').setValue('number');
    await wrapper.get('#value').setValue('0');

    expect(save.attributes('disabled')).toBeUndefined();
    await wrapper.get('form').trigger('submit');

    expect(wrapper.emitted('submit')?.[0]?.[0]).toMatchObject({ key: 'limit', type: 'number', value: 0 });
  });
});
