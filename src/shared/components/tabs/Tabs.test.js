import React from 'react';
import { render, screen } from '@testing-library/react';

import { TabPane } from './Tabs';

describe('TabPane Test', () => {
    test('renders children if value is equal to index', () => {
        render(<TabPane value={0} index={0}><div>tab pane</div></TabPane>);

        expect(screen.getByText("tab pane")).toBeInTheDocument();
    });
});
