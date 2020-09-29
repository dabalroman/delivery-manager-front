import React from 'react';
import MapScreen from "./components/MapScreen/MapScreen";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <div>
            <div className="App" id='react-no-print'>
                <MapScreen/>
            </div>
            <div id='print-mount'/>
        </div>
    );
}

export default App;
