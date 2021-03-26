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

/**
 * Generates a range of dates
 *
 * @param {string} start - the start date
 * @param {string} end - the end date
 * @return {array} - a sorted array containing all dates
 *      from the start date to the end date (inclusive)
 */
const calcDateRange = (start, end) => {
    const numDays = moment(end).diff(moment(start), 'days') + 1;
    const range = [];
    for (let i = 0; i < numDays; i++) {
        range.push(moment(start).add(i, 'days').format('YYYY-MM-DD'));
    }
    return range;
};

/**
 * Redux action to set the date range for the bar chart
 */
export const setDateRange = () => {
    return (dispatch, getState) => {
        const { startDate, endDate } = getState();
        const chartDates = calcDateRange(startDate, endDate);
        return dispatch({ type: SET_DATE_RANGE, payload: chartDates });
    };
};

/**
 * Redux action to fetch channels data from the mock API
 */
export const fetchChannelsData = () => {
    return async (dispatch) => {
        let jsonData;
        try {
            const data = await fetch('channels');
            jsonData = await data.json();
        } catch (error) {
            alert(error.message);
            return;
        }
        return dispatch({ type: FETCH_CHANNELS_DATA, payload: jsonData });
    };
};

/**
 * Redux action to fetch tests data from the mock API
 */
export const fetchTestsData = () => {
    return async (dispatch) => {
        let jsonData;
        try {
            const data = await fetch('tests');
            jsonData = await data.json();
        } catch (error) {
            alert(error.message);
            return;
        }
        return dispatch({ type: FETCH_TESTS_DATA, payload: jsonData });
    };
};

/**
 * Redux action to set the total number of channels in the channels data set
 */
export const setTotalChannels = () => {
    return (dispatch, getState) => {
        const { channels } = getState();
        const total = channels.length;
        return dispatch({ type: SET_TOTAL_CHANNELS, payload: total });
    };
};

/**
 * Redux action to calculate the utilization ratio of test channels
 *      in the form of number of channels used per date in the chart range
 */
export const calcUtilization = () => {
    return (dispatch, getState) => {
        const { channels, tests, endDate } = getState();

        /**
         * Finds test data matching a provided id in the tests data set
         *
         * @param {number} testID - a test ID number
         * @return {object} - properties consisting of the id, start time,
         *      and end time for the test or undefined if not found
         */
        const findTest = (testID) => {
            for (let i = 0; i < tests.length; i++) {
                if (tests[i].id === testID) {
                    return tests[i];
                }
            }
            return undefined;
        };

        /**
         * Collects the dates that tests were active on a test channel
         *
         * @param {Array.<number>} testsOnChannel - a list of test ID numbers assigned to a specific channel
         * @return {Set.<string>} - collection of unique dates that tests were active on the channel
         */
        const getDatesChannelWasUsed = (testsOnChannel) => {
            const datesUsed = new Set();
            for (let i = 0; i < testsOnChannel.length; i++) {
                const testID = testsOnChannel[i];
                const channelTest = findTest(testID);
                if (channelTest.start) {
                    const testStart = moment(channelTest.start).format('YYYY-MM-DD');
                    const testEnd = moment(channelTest.end || endDate).format('YYYY-MM-DD');
                    const testDates = calcDateRange(testStart, testEnd);
                    // add dates the channel was used to the datesUsed set
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

/**
 * Redux action to toggle whether or not the barchart displays data for weekend dates
 *      (Saturday and Sunday)
 */
export const toggleWeekends = () => {
    return (dispatch, getState) => {
        const { displayWeekends } = getState();
        return dispatch({ type: TOGGLE_WEEKENDS, payload: !displayWeekends });
    };
};
