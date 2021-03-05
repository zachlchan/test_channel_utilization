import '../mockAPI'; // Do not remove or modify this line
import React from 'react';
// Add the following import to any file you use async/await in
import 'babel-polyfill';

const App = () => {
    const getChannels = async () => {
        const response = await fetch('tests');
        const jsonResponse = await response.json();
        return jsonResponse;
    };

    return (
        <div>
            <h1>Hello, here's the app!</h1>
            <button type="button" onClick={getChannels}>Get Data</button>
        </div>
    );
};

export default App;
