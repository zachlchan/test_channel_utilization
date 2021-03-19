import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import 'babel-polyfill';
import moment from 'moment';
import { toggleWeekends } from '../actions/index';
import Bar from './Bar';

const BarChart = () => {
    const dispatch = useDispatch();
    const utilization = useSelector(state => state.utilization);
    const dateRange = useSelector(state => state.dateRange);
    const startDate = useSelector(state => state.startDate);
    const endDate = useSelector(state => state.endDate);

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
                <div className="xlabels">
                    <div className="xstart">{moment(startDate).format('MMM D')}</div>
                    <div className="xend">{moment(endDate).format('MMM D')}</div>
                </div>
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
    .xlabels {
        font-size: 0.875rem;
        font-weight: 600;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
    }
`;

export default BarChart;
