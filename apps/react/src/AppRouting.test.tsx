import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import AppRouting from './AppRouting';

describe('AppRouting', () => {

  let component: RenderResult;

  beforeEach(() => {
    component = render(<AppRouting/>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
