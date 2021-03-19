import 'babel-polyfill';
import moment from 'moment';
import {
    SET_DATE_RANGE,
    FETCH_CHANNELS_DATA,
    FETCH_TESTS_DATA,
    SET_TOTAL_CHANNELS,
    CALC_UTILIZATION,
    TOGGLE_WEEKENDS,
} from './actionTypes';

const calcDateRange = (start, end) => {
    const numDays = moment(end).diff(moment(start), 'days') + 1;
    const range = [];
    for (let i = 0; i < numDays; i++) {
        range.push(moment(start).add(i, 'days').format('YYYY-MM-DD'));
    }
    return range;
};

export const setDateRange = () => {
    return (dispatch, getState) => {
        const { startDate, endDate } = getState();
        const chartDates = calcDateRange(startDate, endDate);
        return dispatch({ type: SET_DATE_RANGE, payload: chartDates });
    };
};

export const fetchChannelsData = () => {
    return async (dispatch) => {
        const data = await fetch('channels');
        const jsonData = await data.json();
        return dispatch({ type: FETCH_CHANNELS_DATA, payload: jsonData });
    };
};

export const fetchTestsData = () => {
    return async (dispatch) => {
        const data = await fetch('tests');
        const jsonData = await data.json();
        return dispatch({ type: FETCH_TESTS_DATA, payload: jsonData });
    };
};

export const setTotalChannels = () => {
    return (dispatch, getState) => {
        const { channels } = getState();
        const total = channels.length;
        return dispatch({ type: SET_TOTAL_CHANNELS, payload: total });
    };
};

export const calcUtilization = () => {
    return (dispatch, getState) => {
        const { channels, tests, endDate } = getState();

        const findTest = (testID) => {
            for (let i = 0; i < tests.length; i++) {
                if (tests[i].id === testID) {
                    return tests[i];
                }
            }
            return undefined;
        };

        const getDatesChannelWasUsed = (testsOnChannel) => {
            const datesUsed = new Set();
            for (let i = 0; i < testsOnChannel.length; i++) {
                const testID = testsOnChannel[i];
                const channelTest = findTest(testID);
                if (channelTest.start) {
                    const testStart = moment(channelTest.start).format('YYYY-MM-DD');
                    const testEnd = moment(channelTest.end || endDate).format('YYYY-MM-DD');
                    const testDates = calcDateRange(testStart, testEnd);
                    // add dates the channel was used to set
                    for (let j = 0; j < testDates.length; j++) {
                        const date = testDates[j];
                        datesUsed.add(date);
                    }
                }
            }
            return datesUsed;
        };

        const channelsPerDay = {};
        for (let i = 0; i < channels.length; i++) {
            const testsOnChannel = channels[i].tests;
            const datesUsed = getDatesChannelWasUsed(testsOnChannel);
            const datesUsedArr = [...datesUsed];
            // add to count of channels used per day
            for (let j = 0; j < datesUsedArr.length; j++) {
                const date = datesUsedArr[j];
                channelsPerDay[date] = ++channelsPerDay[date] || 1;
            }
        }
        return dispatch({ type: CALC_UTILIZATION, payload: channelsPerDay });
    };
};

export const toggleWeekends = () => {
    return (dispatch, getState) => {
        const { displayWeekends } = getState();
        return dispatch({ type: TOGGLE_WEEKENDS, payload: !displayWeekends });
    };
};
