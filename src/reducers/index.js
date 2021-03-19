import {
    SET_DATE_RANGE,
    FETCH_CHANNELS_DATA,
    FETCH_TESTS_DATA,
    CALC_UTILIZATION,
} from '../actions/actionTypes';

const initialState = {
    startDate: '2019-11-04',
    endDate: '2019-11-15',
    dateRange: [],
    channels: [],
    tests: [],
    utilization: {},
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
        case CALC_UTILIZATION: {
            return {
                ...state,
                utilization: action.payload
            };
        }
        default:
            return state;
    }
};

export default rootReducer;
