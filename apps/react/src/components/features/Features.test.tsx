import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import Features from './Features';

describe('Features', () => {

  let component: RenderResult;

  beforeEach(() => {
    component = render(<Features/>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
