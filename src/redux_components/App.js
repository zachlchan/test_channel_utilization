import '../mockAPI'; // Do not remove or modify this line
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
// Add the following import to any file you use async/await in
import 'babel-polyfill';
import {
    setDateRange,
    fetchChannelsData,
    fetchTestsData,
    calcUtilization
} from '../actions/index';
import BarChart from './BarChart';

const App = () => {
    const dispatch = useDispatch();
    const startDate = useSelector(state => state.startDate);
    const endDate = useSelector(state => state.endDate);
    const chartRange = useSelector(state => state.dateRange);
    const channelsData = useSelector(state => state.channels);
    const utilization = useSelector(state => state.utilization);

    useEffect(() => {
        (async () => {
            dispatch(setDateRange());
            await dispatch(fetchChannelsData());
            await dispatch(fetchTestsData());
            dispatch(calcUtilization());
        })();
    }, [dispatch]);

    const totalChannels = channelsData.length;

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
