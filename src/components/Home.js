import React from 'react';
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
        </div>
    );
}

export default Home;