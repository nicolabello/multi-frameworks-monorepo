import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { Feature, FeatureValueType } from '../../../../express/src/models/feature';
import FeatureListItem from './FeatureListItem';

describe('FeatureListItem', () => {

  let component: RenderResult;

  beforeEach(() => {
    const data: Feature = {
      _id: 'id',
      key: 'key',
      description: 'description',
      type: FeatureValueType.Boolean,
      value: true
    };
    component = render(<FeatureListItem data={data}/>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
