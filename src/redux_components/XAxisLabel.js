import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

const XAxisLabel = () => {
    const startDate = useSelector(state => state.startDate);
    const endDate = useSelector(state => state.endDate);

    const monthDayFormat = date => moment(date).format('MMM D');

    return (
        <StyledWrapper>
            <div className="xstart">{monthDayFormat(startDate)}</div>
            <div className="xend">{monthDayFormat(endDate)}</div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    font-size: 0.875rem;
    font-weight: 600;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
`;

export default XAxisLabel;
