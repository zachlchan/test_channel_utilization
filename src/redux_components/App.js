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
    setTotalChannels,
    calcUtilization
} from '../actions/index';
import BarChart from './BarChart';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(setDateRange());
            await dispatch(fetchChannelsData());
            await dispatch(fetchTestsData());
            dispatch(setTotalChannels());
            dispatch(calcUtilization());
        })();
    }, [dispatch]);

    return (
        <StyledWrapper>
            <h1>Productivity Dashboard</h1>
            <BarChart />
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
