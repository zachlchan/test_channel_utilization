import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleWeekends } from '../actions/index';

const ToggleWeekendsBTN = () => {
    const dispatch = useDispatch();

    const toggle = () => dispatch(toggleWeekends());

    return (
        <StyledWrapper>
            <button className="wkndBtn" type="button" onClick={toggle}>
                toggle weekends
            </button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
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

export default ToggleWeekendsBTN;