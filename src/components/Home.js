import React from 'react';
import Malfunctions from './Malfunctions'
import MonthlyReadings from './MonthlyReadings';
function Home() {
    return (
        <div className='main-content'>
            <Malfunctions />
            <MonthlyReadings />
        </div>
    );
}

export default Home;