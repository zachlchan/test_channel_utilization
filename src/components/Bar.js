import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Tooltip from './Tooltip';

const Bar = ({
    date,
    totalChannels,
    utilization,
    displayWeekends
}) => {
    // const numChannels = utilization[date] || 0;
    const numChannels = utilization || 0;
    const utilizationRatio = numChannels / totalChannels;
    const barHeight = numChannels ? `${utilizationRatio * 200}px` : 0;
    const tooltipDetails = {
        date: `${date}`,
        ratio: `${numChannels} of ${totalChannels} channels`,
        percentage: `${Math.round(utilizationRatio * 100)}% utilization`,
    };

    const isWeekend = () => {
        const day = moment(date).day();
        if (day === 0 || day === 6) return true;
        return false;
    };

    if (displayWeekends) {
        return (
            <StyledBar>
                <div className="bar" style={{ height: barHeight }}>
                    <Tooltip {...tooltipDetails} />
                </div>
            </StyledBar>
        );
    }
    // filter weekend test dates from data set
    if (!displayWeekends && !isWeekend()) {
        return (
            <StyledBar>
                <div className="bar" style={{ height: barHeight }}>
                    <Tooltip {...tooltipDetails} />
                </div>
            </StyledBar>
        );
    }
    return null;
};

const StyledBar = styled.div`
    position: relative;
    display: inline-block;
    background-color: #6fb3ff;
    width: 20px;
    margin: 2px;
    :hover {
      background-color: #006ce5;
      transition: background-color 0.3s;
      .tooltipText {
        visibility: visible;
        transition: visibility 0.3s;
      }
    }
    .bar {
      display: flex;
    }
    .tooltip, .tooltipText {
      visibility: hidden;
      width: 150px;
      background-color: white;
      border: 1px solid #555;
      color: black;
      text-align: center;
      margin-left: 10px; // half of bar width
      padding: 5px 0;
      border-radius: 6px;
      position: absolute;
      top: 100%;
      left: -50%;
      z-index: 1;
    }
    .tooltip .tooltipText::after {
      content: " ";
      position: absolute;
      bottom: 100%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent black transparent;
    }
`;

export default Bar;
