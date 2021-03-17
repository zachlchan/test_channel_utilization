# Frontend take home 01
A take home exercise for candidates for frontend engineering

Please spend no more than four hours on this project. If you get stuck feel free to contact us with
your questions, we work as a team and would be happy to support you during this project.

You will need node 8.5 or greater installed locally.

Two API endpoints are mocked for you, "channels" and "tests".

Use the native browser "fetch" to access the API.

Example request:
```javascript
const response = await fetch('tests');
const jsonResponse = await response.json();
```

`jsonResponse` should be an object with this signature,
```javascript
[
  {
    id: Number
    start: String, (optional)
    end: String, (optional)
  },
]
```
Investigate the `mockAPI.js` file to know what the `channels` endpoint will return.

To start the development environment and run tests utilize commands provided in the `package.json`
scripts property.

Channels have many tests.
Each channel can only have one test "running" on it at a time.
Each test has a start and end time indicating when it was "running".
A test without an end time is still in progress.
A test without a start time has not begun yet.

# Evaluation guidelines
### Rubrics
* Code clarity/readability
* Testing
* Requirements fulfilled
* Documentation

### Rubric Scoring
1. Unacceptable
2. Poor
3. Good
4. Excellent

# Requirements
## Story
As a supervisor of many battery test labs I would like to see what percentage of my channels are
being utilized on a daily basis. I would like this information to be able to be represented
graphically.

## Detailed requirements
* Get data from the mock api endpoints and determine what percentage of the channels were being
utilized on each day from November 4th to November 15th.
  * A channel is considered "utilized" if at any point on a given day a test was running on it, e.g.
  A test on channel 1 that is started on November 1st and ends November 3rd, was utilizing that
  channel on the 1st, 2nd, and 3rd.

* Represent the percentage of channels utilized with a bar chart where each bar represents a new day
as depicted in the provided designs.

* Weekend days should be able to be toggled on or off in the bar chart and in utilization
calculations.

* Bars should change color on hover and display a tooltip indicating the details of their value.
