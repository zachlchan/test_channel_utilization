import {
    SET_DATE_RANGE,
    FETCH_CHANNELS_DATA,
    FETCH_TESTS_DATA,
    SET_TOTAL_CHANNELS,
    CALC_UTILIZATION,
    TOGGLE_WEEKENDS,
} from '../actions/actionTypes';

const initialState = {
    startDate: '2019-11-04',
    endDate: '2019-11-15',
    dateRange: [],
    channels: [],
    tests: [],
    totalChannels: null,
    utilization: {},
    displayWeekends: true,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATE_RANGE: {
            return {
                ...state,
                dateRange: action.payload
            };
        }
        case FETCH_CHANNELS_DATA: {
            return {
                ...state,
                channels: action.payload
            };
        }
        case FETCH_TESTS_DATA: {
            return {
                ...state,
                tests: action.payload
            };
        }
        case SET_TOTAL_CHANNELS: {
            return {
                ...state,
                totalChannels: action.payload
            };
        }
        case CALC_UTILIZATION: {
            return {
                ...state,
                utilization: action.payload
            };
        }
        case TOGGLE_WEEKENDS: {
            return {
                ...state,
                displayWeekends: action.payload
            };
        }
        default:
            return state;
    }
};

export default rootReducer;
