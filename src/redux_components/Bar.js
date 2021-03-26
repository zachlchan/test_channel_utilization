import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import Tooltip from './Tooltip';

/**
 * Component that displays individual bar elements of the bar chart
 *      with element height representing the utilization ratio
 */
const Bar = ({ date, utilization }) => {
    const totalChannels = useSelector(state => state.totalChannels);
    const displayWeekends = useSelector(state => state.displayWeekends);

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

    const barElement = (
        <StyledWrapper data-testid="bar" barHeight={barHeight}>
            <div className="bar">
                <Tooltip {...tooltipDetails} />
            </div>
        </StyledWrapper>
    );

    if (displayWeekends) {
        return barElement;
    }
    // filter weekend test dates from data set
    if (!displayWeekends && !isWeekend()) {
        return barElement;
    }
    return null;
};

const StyledWrapper = styled.div`
    position: relative;
    display: inline-block;
    background-color: #6fb3ff;
    width: 20px;
    margin: 2px;
    :hover {
        background-color: #006ce5;
        transition: background-color 0.3s;
        .tooltip {
            visibility: visible;
            transition: visibility 0.3s;
        }
    }
    .bar {
        height: ${props => props.barHeight};
        display: flex;
        justify-content: center;
    }
`;

export default Bar;
