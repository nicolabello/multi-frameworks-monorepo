import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import FeatureListItem from './FeatureListItem';

describe('FeatureListItem', () => {

  let component: RenderResult;

  beforeEach(() => {
    component = render(<FeatureListItem data={}/>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
