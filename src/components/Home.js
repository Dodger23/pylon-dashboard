import React from 'react';
import ConnectedMeters from './ConnectedMeters';
import Malfunctions from './Malfunctions'
import MonthlyReadings from './MonthlyReadings';
import Responses from './Responses';
import WaterConstracts from './WaterContracts';
function Home() {
    return (
        <div className='main-content'>
            <Malfunctions />
            <MonthlyReadings />
            <div className='two-charts-container'>
                <WaterConstracts />
                <Responses />
            </div>
            <ConnectedMeters />
        </div>
    );
}

export default Home;