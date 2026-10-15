import { TestBed } from '@angular/core/testing';
import { type Feature, FeatureValueType } from '@feature-toggles/helpers';
import { FeatureFormComponent } from './feature-form';

const feature: Feature = {
  _id: 'id',
  key: 'darkMode',
  description: 'Dark theme',
  type: FeatureValueType.Boolean,
  value: true,
};

async function setup(input: Feature | null) {
  const fixture = TestBed.createComponent(FeatureFormComponent);
  fixture.componentRef.setInput('feature', input);
  await fixture.whenStable();
  return { fixture, el: fixture.nativeElement as HTMLElement };
}

describe('FeatureFormComponent', () => {
  it('renders an existing feature and its preview', async () => {
    const { el } = await setup(feature);

    expect(el.querySelector<HTMLInputElement>('#key')!.value).toBe('darkMode');
    expect(el.querySelector<HTMLSelectElement>('#type')!.value).toBe('boolean');
    expect(el.querySelector<HTMLInputElement>('[role="switch"]')!.checked).toBe(true);
    expect(el.querySelector('.ft-preview')!.textContent).toContain('"darkMode": true');
  });

  it('disables Save until the form is valid, then emits saved', async () => {
    const { fixture, el } = await setup(null);
    const saved: Feature[] = [];
    fixture.componentInstance.saved.subscribe((value) => saved.push(value));

    const save = el.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    expect(save.disabled).toBe(true);

    const key = el.querySelector<HTMLInputElement>('#key')!;
    key.value = 'limit';
    key.dispatchEvent(new Event('input'));

    const type = el.querySelector<HTMLSelectElement>('#type')!;
    type.value = 'number';
    type.dispatchEvent(new Event('change'));
    await fixture.whenStable();

    const value = el.querySelector<HTMLInputElement>('#value')!;
    value.value = '0';
    value.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(save.disabled).toBe(false);
    save.click();

    expect(saved[0]).toMatchObject({ key: 'limit', type: 'number', value: 0 });
  });
});
