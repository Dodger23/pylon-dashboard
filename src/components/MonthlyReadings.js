import React from 'react';
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { useState, useEffect } from "react";
function MonthlyReadings() {

    const [initialData, setInitialData] = useState([]);
    const [sortBy, setSortBy] = useState("month");
    const [axisBottom, setAxisBottom] = useState({
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "الشهر",
        legendPosition: "middle",
        legendOffset: 50,
      });
    useEffect(() => {
        fetch("https://my-json-server.typicode.com/Dodger23/pylon-json-placeholder/monthly-readings")
          .then((res) => res.json())
          .then((data) => setInitialData(data));
      }, []);

      const formatData = (data, sortByValue) => {
        const aggregateByMonth = (data) => {
          const getMonthName = (date) => {
            const months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            return months[new Date(Date.parse(date)).getMonth()];
          };
          const getYearName = (date) => {
            return new Date(Date.parse(date)).getFullYear();
          };
    
          let newData = [];
          const months = new Set(
            data.map((record) => {
              return getMonthName(record.id) + " " + getYearName(record.id);
            })
          );
          months.forEach((month) => {
            let newRecord = {};
            data.forEach((item, index) => {
              if (getMonthName(item.id) + " " + getYearName(item.id) === month) {
                Object.keys(item.values).forEach((key) => {
                    let temp = ''
                    if(key==='accepted')
                        temp = 'مقبول'
                    else
                        temp = 'مشكوك فيه'
                  newRecord[temp] = newRecord[temp]
                    ? newRecord[temp] + item.values[key]
                    : item.values[key];
                });
              }
            });
            newRecord["month"] = month;
            newData.push(newRecord);
          });
          return newData;
        };
    
        const aggregateByYear = (data) => {
          const getYearName = (date) => {
            return new Date(Date.parse(date)).getFullYear();
          };
    
          let newData = [];
          const years = new Set(
            data.map((record) => {
              return getYearName(record.id);
            })
          );
          years.forEach((year) => {
            let newRecord = {};
            data.forEach((item, index) => {
              if (getYearName(item.id) === year) {
                Object.keys(item.values).forEach((key) => {
                    let temp = ''
                    if(key==='accepted')
                        temp = 'مقبول'
                    else
                        temp = 'مشكوك فيه'
                  newRecord[temp] = newRecord[temp]
                    ? newRecord[temp] + item.values[key]
                    : item.values[key];
                });
              }
            });
            newRecord["year"] = year;
            newData.push(newRecord);
          });
          return newData;
        };
    
        const aggregateByDay = (data) => {
          return data.map((record) => {
            let newRecord = {};
            Object.keys(record.values).forEach((key) => {
                let temp = ''
                    if(key==='accepted')
                        temp = 'مقبول'
                    else
                        temp = 'مشكوك فيه'
              newRecord[temp] = record.values[key];
            });
            newRecord["day"] = record.id;
            return newRecord;
          });
        };
    
        if (sortByValue === "month") data = aggregateByMonth(data);
        else if (sortByValue === "day") data = aggregateByDay(data);
        else if (sortByValue === "year") data = aggregateByYear(data);
        return data;
      };      


    const getPieData = (data) => {
        let notAccepted = 0 
        let accepted = 0 
        data.forEach(record => {
            notAccepted+= record.values['not accepted'];
            accepted+= record.values['accepted'];
        })
        return [
            {
                "id": "مشكوك فيه",
                "label": "مشكوك فيه",
                "value": (notAccepted /(notAccepted + accepted) ).toFixed(2),
            },
            {
                "id": "مقبول",
                "label": "مقبول",
                "value": (accepted / (notAccepted +accepted)).toFixed(2),
            }
        ]
    }

      const sortMalfunctions = (e) =>{
        setSortBy(e.target.value);
        if (e.target.value === "year")
        setAxisBottom({ ...axisBottom, legend: "السنة", tickRotation: 0 });
        else if (e.target.value === "month")
        setAxisBottom({ ...axisBottom, legend: "الشهر", tickRotation: 0 });
        else if (e.target.value === "day")
        setAxisBottom({
            ...axisBottom,
            legend: "اليوم",
            tickRotation: -45,
        });
      }
    return (
        <div className='monthly-readings-container'>     
        <div className="chart-title-container">
            <h1 className="arabic" style={{ direction: "rtl" }}>
              القراءات الشهرية
            </h1>
            <div className="chart-sortby">
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
            </div>
        </div>
            <div className='monthly-readings-charts-container'>
                <div className='monthly-readings-charts'>
                    <ResponsiveBar
                        data={formatData(initialData, sortBy)}
                        keys={[ 'مشكوك فيه', 'مقبول']}
                        indexBy={sortBy}
                        margin={{ top: 50, right: 130, bottom: 60, left: 60 }}
                        padding={0.3}
                        groupMode="grouped"
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={["#ff6e6e", "#6ea7ff"]}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={axisBottom}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'العدد',
                            legendPosition: 'middle',
                            legendOffset: -60,
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
                    />

                    <ResponsivePie
                    data={getPieData(initialData)}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.6}
                    padAngle={0.7}
                    cornerRadius={3}
                    valueFormat={'>-.2%'}
                    colors={["#ff6e6e", "#6ea7ff"]}
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
                            translateY: 56,
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
     </div>
    );
}

export default MonthlyReadings;