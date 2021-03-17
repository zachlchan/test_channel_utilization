import '../mockAPI'; // Do not remove or modify this line
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// Add the following import to any file you use async/await in
import 'babel-polyfill';
import moment from 'moment';
import BarChart from './BarChart';

const App = () => {
    const fetchData = async (url) => {
        const data = await fetch(url);
        const jsonData = await data.json();
        return jsonData;
    };

    const [channels, setChannels] = useState(null);
    const [totalChannels, setTotalChannels] = useState(null);
    const [tests, setTests] = useState(null);
    useEffect(() => {
        (async () => {
            const channelsResponse = await fetchData('channels');
            const testsResponse = await fetchData('tests');
            setChannels(channelsResponse);
            setTotalChannels(channelsResponse.length);
            setTests(testsResponse);
        })();
    }, []);

    // can add setter to manipulate the chart range
    const [startDate] = useState('2019-11-04');
    const [endDate] = useState('2019-11-15');

    const calcDateRange = (start, end) => {
        const numDays = moment(end).diff(moment(start), 'days') + 1;
        const range = [];
        for (let i = 0; i < numDays; i++) {
            range.push(moment(start).add(i, 'days').format('YYYY-MM-DD'));
        }
        return range;
    };

    const [chartRange, setChartRange] = useState(null);
    useEffect(() => {
        const chartDates = calcDateRange(startDate, endDate);
        setChartRange(chartDates);
    }, []);

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

    const [utilization, setUtilization] = useState(null);
    useEffect(() => {
        if (tests && channels) {
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
            setUtilization(channelsPerDay);
        }
    }, [tests, channels]);

    const childProps = {
        totalChannels,
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
    h1 {
        padding-bottom: 10px;
        border-bottom: 1px solid gray;
    }
`;

export default App;
