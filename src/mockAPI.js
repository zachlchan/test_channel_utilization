import fetchMock from 'fetch-mock';

const channelsResponse = [
    {
        id: 372,
        name: 'Channel 01',
        lab: 'Fullerton',
        tests: [3, 4, 7, 8],
    },
    {
        id: 373,
        name: 'Channel 02',
        lab: 'Fullerton',
        tests: [1, 2, 5, 6],
    },
    {
        id: 374,
        name: 'Beta Channel',
        lab: 'Fullerton',
        tests: [],
    },
    {
        id: 472,
        name: 'Channel 01',
        lab: 'Queens',
        tests: [9, 11, 12, 13],
    },
    {
        id: 473,
        name: 'Channel 02',
        lab: 'Queens',
        tests: [15, 17, 19],
    },
    {
        id: 474,
        name: 'Channel 03',
        lab: 'Queens',
        tests: [21, 22, 24, 25],
    },
    {
        id: 475,
        name: 'Channel 04',
        lab: 'Queens',
        tests: [26, 27, 28, 29, 30],
    },
];

const testsResponse = [
    {
        id: 1,
        start: '2019-11-05T11:05:00Z',
        end: '2019-11-05T13:05:00Z',
    },
    {
        id: 2,
        start: '2019-11-06T11:05:00Z',
        end: '2019-11-06T13:05:00Z',
    },
    {
        id: 3,
        start: '2019-11-04T11:05:00Z',
        end: '2019-11-04T13:09:00Z',
    },
    {
        id: 4,
        start: '2019-11-04T17:00:00Z',
        end: '2019-11-05T09:32:00Z',
    },
    {
        id: 5,
        start: '2019-11-11T11:05:00Z',
        end: '2019-11-12T13:05:00Z',
    },
    {
        id: 6,
        start: '2019-11-12T14:05:00Z',
        end: '2019-11-15T13:05:00Z',
    },
    {
        id: 7,
        start: '2019-11-07T11:05:00Z',
        end: '2019-11-08T13:05:00Z',
    },
    {
        id: 8,
        start: '2019-11-08T15:05:00Z',
        end: '2019-11-08T15:35:00Z',
    },
    {
        id: 9,
        start: '2019-11-05T09:05:00Z',
        end: '2019-11-08T12:05:00Z',
    },
    {
        id: 11,
        start: '2019-11-08T12:35:00Z',
        end: '2019-11-08T13:35:00Z',
    },
    {
        id: 12,
        start: '2019-11-08T17:00:00Z',
        end: '2019-11-11T10:00:00Z',
    },
    {
        id: 13,
        start: '2019-11-11T12:00:00Z',
        end: null,
    },
    {id: 15},
    {
        id: 17,
        start: '2019-11-05T17:00:00Z',
        end: '2019-11-06T10:00:00Z',
    },
    {
        id: 19,
        start: '2019-11-06T12:00:00Z',
        end: '2019-11-06T13:22:00Z',
    },
    {
        id: 21,
        start: '2019-11-05T09:05:00Z',
        end: '2019-11-06T12:05:00Z',
    },
    {
        id: 22,
        start: '2019-11-08T12:35:00Z',
        end: '2019-11-08T13:35:00Z',
    },
    {
        id: 24,
        start: '2019-11-11T17:00:00Z',
        end: '2019-11-15T10:00:00Z',
    },
    {
        id: 25,
        start: '2019-11-15T12:00:00Z',
    },
    {
        id: 26,
        start: '2019-11-05T09:05:00Z',
        end: '2019-11-06T12:05:00Z',
    },
    {
        id: 27,
        start: '2019-11-07T12:35:00Z',
        end: '2019-11-07T13:35:00Z',
    },
    {
        id: 28,
        start: '2019-11-08T17:00:00Z',
        end: '2019-11-11T10:00:00Z',
    },
    {
        id: 29,
        start: '2019-11-12T12:00:00Z',
        end: '2019-11-12T14:00:00Z',
    },
    {
        id: 30,
        start: '2019-11-13T12:00:00Z',
        end: '2019-11-13T14:00:00Z',
    },
];

export default fetchMock
    .mock(/\/channels\/?$/, channelsResponse)
    .mock(/\/tests\/?$/, testsResponse);
