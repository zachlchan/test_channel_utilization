/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import BarChart from '../src/components/BarChart';

const expectedChannelUtilizations = [
    {
        date: '2019-11-04T00:00:00.000Z',
        utilizationPercentage: 14,
    },
    {
        date: '2019-11-05T00:00:00.000Z',
        utilizationPercentage: 86,
    },
    {
        date: '2019-11-06T00:00:00.000Z',
        utilizationPercentage: 71,
    },
    {
        date: '2019-11-07T00:00:00.000Z',
        utilizationPercentage: 43,
    },
    {
        date: '2019-11-08T00:00:00.000Z',
        utilizationPercentage: 57,
    },
    {
        date: '2019-11-09T00:00:00.000Z',
        utilizationPercentage: 29,
    },
    {
        date: '2019-11-10T00:00:00.000Z',
        utilizationPercentage: 29,
    },
    {
        date: '2019-11-11T00:00:00.000Z',
        utilizationPercentage: 57,
    },
    {
        date: '2019-11-12T00:00:00.000Z',
        utilizationPercentage: 57,
    },
    {
        date: '2019-11-13T00:00:00.000Z',
        utilizationPercentage: 57,
    },
    {
        date: '2019-11-14T00:00:00.000Z',
        utilizationPercentage: 43,
    },
    {
        date: '2019-11-15T00:00:00.000Z',
        utilizationPercentage: 43,
    },
];

const startDate = '2019-11-08';
const endDate = '2019-11-11';
const chartRange = ['2019-11-08', '2019-11-09', '2019-11-10', '2019-11-11'];
const totalChannels = 7;
const utilization = {
    '2019-11-08': 4,
    '2019-11-09': 2,
    '2019-11-10': 2,
    '2019-11-11': 4,
};

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


// describe('Your test suite', () => {
//     it('should test if your work is accurate.', () => {
//         expect().toEqual(expectedChannelUtilizations);
//     });
// });

describe('BarChart', () => {
    const childProps = {
        totalChannels,
        utilization,
        chartRange,
        startDate,
        endDate,
    };

    it('can toggle display of weekend data', () => {
        act(() => {
            render(<BarChart {... childProps} />, container);
        });

        // locate the toggle button
        const button = container.querySelector('button.wkndBtn');
        expect(button.innerHTML).toBe('toggle weekends');

        // confirm the barchart displays all data
        const bars = container.querySelectorAll('div.bar');
        expect(bars.length).toBe(4);

        // trigger click on button to toggle display of weekend data
        act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        const noWkndBars = container.querySelectorAll('div.bar');
        expect(noWkndBars.length).toBe(2);
    });

    // it('should calculate utilization ratio accurately', () => {
    // });
});
