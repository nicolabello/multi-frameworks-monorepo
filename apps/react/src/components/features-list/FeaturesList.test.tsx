import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import FeaturesList from './FeaturesList';

describe('FeaturesList', () => {

  let component: RenderResult;

  beforeEach(() => {
    component = render(<FeaturesList data={[]}/>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
