import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ToggleWeekendsBTN from './ToggleWeekendsBTN';
import Bar from './Bar';
import XAxisLabel from './XAxisLabel';

const BarChart = () => {
    const utilization = useSelector(state => state.utilization);
    const dateRange = useSelector(state => state.dateRange);

    const getBars = () => {
        return (
            dateRange.map(date => <Bar key={date} date={date} utilization={utilization[date]} />)
        );
    };

    return (
        <StyledWrapper>
            <ToggleWeekendsBTN />
            <h2>channel utilization</h2>
            <div className="barChart">
                {getBars()}
                <XAxisLabel />
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    h2 {
        padding-bottom: 10px;
        border-bottom: 1px solid gray;
        font-size: 100%;
        text-transform: uppercase;
        margin-left: 25%;
    }
    .barChart {
        width: fit-content;
        margin-left: 25%;
    }
`;

export default BarChart;
