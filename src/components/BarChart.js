import React from 'react';
import styled from 'styled-components';

const BarChart = () => {
    const isWeekend = (date) => {
        const testDate = new Date(date);
        const day = testDate.getDay();
        if (day === 0 || day === 6) return true;
        return false;
    };

    return (
        <StyledWrapper>
            <div className="toggleContainer">
                <button className="wkndBtn" type="button" onClick={() => console.log(isWeekend('2019-11-11T17:00:00Z'))}>
                    toggle weekends
                </button>
            </div>
            <h2>channel utilization</h2>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    h2 {
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
`;

export default BarChart;
