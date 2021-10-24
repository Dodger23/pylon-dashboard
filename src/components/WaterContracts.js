import React from 'react';
import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect } from "react";

function WaterConstracts() {

    const [initialData, setInitialData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3004/water-contracts")
          .then((res) => res.json())
          .then((data) => setInitialData(data));
      }, []);

    const getPieData = (data) => {
        let notGood = 0 
        let good = 0
        let done =0  
        const getPercentage= (...nums) => {
            return (nums[0] / ( nums[0]+ nums[1] + nums[2] )  ).toFixed(2)
        }
        data.forEach(record => {
            notGood+= record.values['not good'];
            good+= record.values['good'];
            done+= record.values['done']
        })
        return [
            {
                "id": "مركب",
                "label": "مركب",
                "value": getPercentage(done, good, notGood)
            },
            {
                "id": "مهيأة",
                "label": "مهيأة",
                "value": getPercentage(good, notGood, done)
            },
            {
                "id": "غير مهيأة",
                "label": "غير مهيأة",
                "value": getPercentage(notGood, good, done)
            }
        ]
    }



    return (
        <div className='water-contracts-container'>
            <div className="chart-title-container">
                <h1 className='arabic'>عقود المياه</h1>
            </div>
            <div className='water-contracts-chart-container'>
            <ResponsivePie
                    data={getPieData(initialData)}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.6}
                    padAngle={0.7}
                    valueFormat={'>-.2%'}
                    cornerRadius={3}
                    colors={["#3CAEA3", "#F6D55C", "#ED553B", "#FA897B", "#CCABD8"]}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 50,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                    />
            </div>
        </div>
    );
}

export default WaterConstracts;