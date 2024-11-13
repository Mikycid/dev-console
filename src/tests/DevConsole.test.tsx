import React from 'react';
import { render, screen } from '@testing-library/react';
import { DevConsole } from '../DevConsole';

describe('DevConsole', () => {
  it('renders without crashing', () => {
    render(<DevConsole modules={[]} />);
  });

  it('renders with default props', () => {
    render(
      <DevConsole
        modules={[]}
        disableMove={false}
        disableResize={false}
        showLogControls={true}
      />
    );
  });
});