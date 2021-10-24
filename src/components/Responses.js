import React from 'react';
import { useState, useEffect } from "react";
function Responses() {

    const [initialData, setInitialData] = useState([])
    const [data, setData] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        fetch("http://localhost:3004/responses")
          .then((res) => res.json())
          .then((data) => {setInitialData(sortData(data));  setData(sortData(data)); return data});
          // eslint 
      }, []);
          
    const sortData = (data) => {
        return data.sort((a , b) => b.value -a.value)
    }  

    const filterData = (data, value) => {
        if(value === '')
            return data;
        return data.filter(item => {
            if(item.id.includes(value))
                return true;
            return false; 
        })
    }

    const setResponsesData = (data , value) => {
        setData(filterData(data,value))
    } 
    
    const handleSearchValueChange = (data , e) => {
        setSearchValue(e.target.value)
        setResponsesData(data , e.target.value)
    }


    return (
        <div className='responses-container'>
            <div className='chart-title-container'>
                <h1 className='arabic'>الردود المحتملة</h1>
                <div className='search-box'>
                    <input value={searchValue} onChange={(e) => handleSearchValueChange(initialData, e)} placeholder='بحث' className='arabic' />
                </div>
            </div>
            <div className='responses-chart-container'>
                <div className='table'>
                    <div className='table-head'>
                        <p className='arabic'>العدد</p>
                        <p className='arabic'>الرد</p>
                    </div>
                    {
                        data.map(item => {
                            return <div className='table-row' key={item.id}>
                                <p>{item.value}</p>
                                <p className='arabic'>{item.id}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Responses;