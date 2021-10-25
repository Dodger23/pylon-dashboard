import React from 'react';
import { ResponsiveLine } from '@nivo/line'
// import { useState, useEffect } from "react";
function ConnectedMeters() {

    const data = [
        {
          "id": "العدادات المتصلة",
          "data": [
            {
              "x": "01/10/2021",
              "y": 10
            },
            {
              "x": "04/10/2021",
              "y": 3
            },
            {
              "x": "15/10/2021",
              "y": 5
            },
            {
              "x": "17/10/2021",
              "y": 4
            },
          ]
        }
    ]
    return (
        <div className='connected-meters-container'>
            <div className="chart-title-container">
            <h1 className="arabic" style={{ direction: "rtl" }}>
               العدادات المتصلة
            </h1>
            {/* <div className="chart-sortby">
              <p className="arabic">عرض على حسب</p>
              <select
                className="arabic"
                defaultValue={"month"}
                onChange={(e) => sortMalfunctions(e)}
              >
                <option value="year" className="arabic">
                  السنة
                </option>
                <option value="month" className="arabic">
                  الشهر
                </option>
                <option value="day" className="arabic">
                  اليوم
                </option>
              </select>
            </div> */}
            </div>
            <div className='connected-meters-chart-container'>
                <div className='connected-meters-chart'>
                    <ResponsiveLine
                        data={data}
                        margin={{ top: 50, right: 50, bottom: 60, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: '0', max: 'auto', stacked: true, reverse: false }}
                        yFormat=" >-.0f"
                        curve="cardinal"
                        colors={['#6145BF']}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legendOffset: 36,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legendOffset: -40,
                            legendPosition: 'middle'
                        }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        enableArea={true}
                        useMesh={true}
                        legends={[]}
                    />
                </div>
            </div>
        </div>
    );
}

export default ConnectedMeters;