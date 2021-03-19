import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleWeekends } from '../actions/index';
import Bar from './Bar';
import XAxisLabel from './XAxisLabel';

const BarChart = () => {
    const dispatch = useDispatch();
    const utilization = useSelector(state => state.utilization);
    const dateRange = useSelector(state => state.dateRange);

    const getBars = () => {
        return (
            dateRange.map(date => <Bar key={date} date={date} utilization={utilization[date]} />)
        );
    };

    return (
        <StyledWrapper>
            <div className="toggleContainer">
                <button className="wkndBtn" type="button" onClick={() => dispatch(toggleWeekends())}>
                    toggle weekends
                </button>
            </div>
            <h2>channel utilization</h2>
            <div className="barChart">{getBars()}
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
    .toggleContainer {
        display: flex;
        justify-content: flex-end;
    }
    .wkndBtn {
        font-size: 100%;
        text-transform: uppercase;
        line-height: 0.1;
        color: white;
        background-color: #006ce5;
        height: 30px;
        padding: 10px;
        border: none;
        :hover {
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.5s;
        }
        :focus {
            outline: none;
        }
    }
    .barChart {
        width: fit-content;
        margin-left: 25%;
    }
`;

export default BarChart;
