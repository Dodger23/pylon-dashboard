import React from 'react';
import Malfunctions from './Malfunctions'
import MonthlyReadings from './MonthlyReadings';
import WaterConstracts from './WaterContracts';
function Home() {
    return (
        <div className='main-content'>
            <Malfunctions />
            <MonthlyReadings />
            <WaterConstracts />
        </div>
    );
}

export default Home;