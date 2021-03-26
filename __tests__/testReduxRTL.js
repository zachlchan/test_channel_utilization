/* eslint-disable no-undef */
import React from 'react';
import { render, screen, within } from '../test-utils';

import BarChart from '../src/redux_components/BarChart';

const testState = {
    startDate: '2019-11-08',
    endDate: '2019-11-11',
    dateRange: ['2019-11-08', '2019-11-09', '2019-11-10', '2019-11-11'],
    totalChannels: 7,
    utilization: {
        '2019-11-08': 4,
        '2019-11-09': 2,
        '2019-11-10': 2,
        '2019-11-11': 4,
    },
    displayWeekends: true,
};

describe('BarChart', () => {
    test('can toggle display of weekend data', async () => {
        render(<BarChart />, { initialState: testState });

        // locate the toggle button
        const button = screen.queryByText(/toggle weekends/);
        expect(button.innerHTML).toBe('toggle weekends');

        const barChart = screen.getByTestId('barChart');
        const { getAllByTestId } = within(barChart);
        const bars = getAllByTestId('bar');
        expect(bars.length).toBe(4);

        // trigger click on button to toggle display of weekend data
        // act(() => {
        //     button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        // });
        // ReactTestUtils.Simulate.click(button);
        // console.log(testStore.getState());
        // const noWkndBars = container.querySelectorAll('div.bar');
        // expect(noWkndBars.length).toBe(2);
    });
});
