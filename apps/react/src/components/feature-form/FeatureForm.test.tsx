import { Feature, FeatureValueType } from '@feature-toggles/helpers';
import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import FeatureForm from './FeatureForm';

describe('FeatureForm', () => {

  let component: RenderResult;

  beforeEach(() => {
    const data: Feature = {
      _id: 'id',
      key: 'key',
      description: 'description',
      type: FeatureValueType.Boolean,
      value: true
    };
    component = render(<FeatureForm data={data} onCancel={() => null} onSubmit={() => null}/>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
