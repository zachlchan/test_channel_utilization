import React from 'react';
import styled from 'styled-components';

/**
 * Component that displays a tooltip when the user hovers over a bar element
 */
const Tooltip = ({ date, ratio, percentage }) => {
    return (
        <StyledWrapper data-testid="tooltip" className="tooltip">
            <h3 className="detailTitle">{date}</h3>
            <ul className="detailList">
                <li className="detailText">{ratio}</li>
                <li className="detailText">{percentage}</li>
            </ul>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    visibility: hidden;
    width: 150px;
    background-color: white;
    border: 1px solid #555;
    color: black;
    text-align: center;
    padding: 5px 0;
    margin-top: 10px;
    border-radius: 6px;
    position: absolute;
    top: 100%;
    z-index: 1;
    ::after {
        content: " ";
        position: absolute;
        bottom: 100%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent black transparent;
    }
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
