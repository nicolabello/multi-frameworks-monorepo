import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import Feature from './Feature';

describe('Feature', () => {

  let component: RenderResult;

  beforeEach(() => {
    component = render(<Feature/>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
