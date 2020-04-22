import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { Feature, FeatureValueType } from '../../../../express/src/models/feature';
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
    component = render(<FeatureForm data={data}/>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
