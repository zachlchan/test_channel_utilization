/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render, unmountComponentAtNode } from 'react-dom';
import ReactTestUtils, { act } from 'react-dom/test-utils';

import rootReducer from '../src/reducers/index';
import BarChart from '../src/redux_components/BarChart';

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('BarChart', () => {
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

    test('it can toggle display of weekend data', () => {
        const testStore = createStore(rootReducer, testState, applyMiddleware(thunk));
        act(() => {
            render(
                <Provider store={testStore}>
                    <BarChart />
                </Provider>, container
            );
        });

        // locate the toggle button
        const button = container.querySelector('[data-testid=wkndBtn]');
        expect(button).toBeTruthy();

        // confirm the barchart displays all data
        const bars = container.querySelectorAll('[data-testid=bar]');
        expect(bars.length).toBe(4);

        // trigger a button click
        ReactTestUtils.Simulate.click(button);

        // confirm the button dispatches an action to trigger a state chanage
        expect(testStore.getState().displayWeekends).toBe(false);

        // confirm only weekday data is displayed when displayWeekends is false
        const noWkndBars = container.querySelectorAll('[data-testid=bar]');
        expect(noWkndBars.length).toBe(2);
    });
});
