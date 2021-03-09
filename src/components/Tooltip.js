import React from 'react';
import styled from 'styled-components';

const Tooltip = ({
    date,
    ratio,
    percentage
}) => {
    return (
        <StyledWrapper className="tooltip">
            <div className="tooltipText">
                <h3 className="detailTitle">{date}</h3>
                <ul className="detailList">
                    <li className="detailText">{ratio}</li>
                    <li className="detailText">{percentage}</li>
                </ul>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .detailTitle {
      font-size: 100%;
    }
    .detailList {
      list-style-type: none;
      padding-inline-start: 0;
    }
    .detailText {
      margin: 5px;
    }
`;

export default Tooltip;
