import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {

  let component: RenderResult;

  beforeEach(() => {
    component = render(<App/>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
