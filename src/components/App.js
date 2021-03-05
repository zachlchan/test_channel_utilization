import '../mockAPI'; // Do not remove or modify this line
import React from 'react';
import styled from 'styled-components';
// Add the following import to any file you use async/await in
import 'babel-polyfill';
import BarChart from './BarChart';

const App = () => {
    const getData = async (endpoint) => {
        const response = await fetch(endpoint);
        return response.json();
    };

    const getChannels = async () => {
        const data = await (getData('channels'));
        return data;
    };

    const getTests = async () => {
        const data = await (getData('tests'));
        return data;
    };

    return (
        <StyledWrapper>
            <h1>Productivity Dashboard</h1>
            <BarChart />
            <button type="button" onClick={getChannels}>
                Get Channel Data
            </button>
            <button type="button" onClick={getTests}>
                Get Test Data
            </button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    h1, h2 {
        font-family: 'Source Sans Pro',Helvetica,Arial,Lucida,sans-serif;
        border-bottom: 1px solid gray;
    }
`;

export default App;
