import '../mockAPI'; // Do not remove or modify this line
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// Add the following import to any file you use async/await in
import 'babel-polyfill';
import moment from 'moment';
import BarChart from './BarChart';

const App = () => {
    const [startDate] = useState('2019-11-04');
    const [endDate] = useState('2019-11-15');

    const calcDateRange = (start, end) => {
        const numDays = moment(end).diff(moment(start), 'days') + 1;
        const range = [];
        for (let i = 0; i < numDays; i++) {
            range.push(moment(start).add(i, 'days').format('YYYY-MM-DD'));
        }
        // console.log(range);
        return range;
    };

    const [chartRange, setChartRange] = useState(null);
    useEffect(() => {
        const chartDates = calcDateRange(startDate, endDate);
        setChartRange(chartDates);
    }, []);

    // fetch helper
    const fetchData = async (url) => {
        const data = await fetch(url);
        const jsonData = await data.json();
        return jsonData;
    };

    const [channels, setChannels] = useState(null);
    const [tests, setTests] = useState(null);
    useEffect(() => {
        (async () => {
            const channelsResponse = await fetchData('channels');
            setChannels(channelsResponse);
            const testsResponse = await fetchData('tests');
            setTests(testsResponse);
        })();
    }, []);

    const findTest = (testID) => {
        for (let i = 0; i < tests.length; i++) {
            if (tests[i].id === testID) {
                return tests[i];
            }
        }
        return undefined;
    };
    const [utilization, setUtilization] = useState(null);
    useEffect(() => {
        if (tests && channels) {
            const channelsPerDay = {};
            for (let i = 0; i < channels.length; i++) {
                const testsOnChannel = channels[i].tests;
                // console.log(testsOnChannel);
                const datesUsed = new Set();
                for (let j = 0; j < testsOnChannel.length; j++) {
                    const testID = testsOnChannel[j];
                    const channelTest = findTest(testID);
                    if (channelTest.start) {
                        // console.log(channelTest.start);
                        // remove time component from date
                        const testStart = moment(channelTest.start).format('YYYY-MM-DD');
                        const testEnd = moment(channelTest.end || endDate).format('YYYY-MM-DD');
                        const testDates = calcDateRange(testStart, testEnd);
                        // find set of dates the channel was used
                        // console.log(testDates);
                        for (let k = 0; k < testDates.length; k++) {
                            const date = testDates[k];
                            datesUsed.add(date);
                        }
                    }
                }
                // convert set to array
                const datesUsedArr = [...datesUsed];
                // add to count of channels used per day
                for (let m = 0; m < datesUsedArr.length; m++) {
                    const date = datesUsedArr[m];
                    // console.log('used on', date);
                    channelsPerDay[date] = ++channelsPerDay[date] || 1;
                }
            }
            setUtilization(channelsPerDay);
        }
    }, [tests, channels]);

    const childProps = {
        totalChannels: '7',
        utilization,
        chartRange,
        startDate,
        endDate,
    };

    return (
        <StyledWrapper>
            <h1>Productivity Dashboard</h1>
            <BarChart {...childProps} />
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    font-family: 'Source Sans Pro',Helvetica,Arial,Lucida,sans-serif;
    h1, h2 {
        padding-bottom: 10px;
        border-bottom: 1px solid gray;
    }
`;

export default App;
