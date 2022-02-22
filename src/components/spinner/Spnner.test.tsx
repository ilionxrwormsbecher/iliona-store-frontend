
import { render } from '@testing-library/react';
import React from 'react'
import { Spinner } from './Spinner';

test('should render the spinner', async () => { 
    const { getByTestId} = render(<Spinner />);
    const spinner = getByTestId("spinner");

    expect(spinner).not.toBeUndefined()
});



