import React from "react";
import {
  FaTimes,
  FaCheck,
  FaCalendarPlus,
  FaWrench,
  FaDatabase,
} from "react-icons/fa";
import { ResponsiveBar } from "@nivo/bar";
import { useState, useEffect } from "react";
function Malfunctions() {
  const [malfunctionsData, setMalfunctionsData] = useState([]);
  const [sortBy, setSortBy] = useState("month");
  const [axisBottom, setAxisBottom] = useState({
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "الشهر",
    legendPosition: "middle",
    legendOffset: 50,
  });

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
              newRecord[key] = newRecord[key]
                ? newRecord[key] + item.values[key]
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
              newRecord[key] = newRecord[key]
                ? newRecord[key] + item.values[key]
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
          newRecord[key] = record.values[key];
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

  useEffect(() => {
    fetch("http://localhost:3004/malfunctions")
      .then((res) => res.json())
      .then((data) => setMalfunctionsData(data));
  }, []);

  const sortMalfunctions = (e) => {
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
  };

  return (
    <div className="main-content">
      <div className="malfunctions-container ">
        <div className="malfunctions-stats-container">
          <div className="malfunctions-stat">
            <div className="stat-info-container">
              <h3>159</h3>
              <p className="arabic">مغلق</p>
            </div>
            <div
              className="stat-icon-container"
              style={{ backgroundColor: "#ffd2da", color: "#ff5c7a" }}
            >
              <FaTimes />
            </div>
          </div>
          <div className="malfunctions-stat">
            <div className="stat-info-container">
              <h3>5,720</h3>
              <p className="arabic">تم تركيبه</p>
            </div>
            <div
              className="stat-icon-container"
              style={{ backgroundColor: "#acffe3", color: "#20c58e" }}
            >
              <FaCheck />
            </div>
          </div>
          <div className="malfunctions-stat">
            <div className="stat-info-container">
              <h3>6,436</h3>
              <p className="arabic">متوقع تركيبه</p>
            </div>
            <div
              className="stat-icon-container"
              style={{
                backgroundColor: "rgb(255, 254, 219)",
                color: "rgb(197, 193, 87)",
              }}
            >
              <FaCalendarPlus />
            </div>
          </div>
          <div className="malfunctions-stat">
            <div className="stat-info-container">
              <h3>590</h3>
              <p className="arabic">في الصيانة</p>
            </div>
            <div
              className="stat-icon-container"
              style={{
                backgroundColor: "rgb(219, 238, 255)",
                color: "rgb(87, 120, 197)",
              }}
            >
              <FaWrench />
            </div>
          </div>
          <div className="malfunctions-stat">
            <div className="stat-info-container">
              <h3>6,570</h3>
              <p className="arabic">اجمالي</p>
            </div>
            <div
              className="stat-icon-container"
              style={{
                backgroundColor: "rgb(240, 219, 255)",
                color: "rgb(157, 87, 197)",
              }}
            >
              <FaDatabase />
            </div>
          </div>
        </div>

        <div className="malfunctions-chart-container">
          <div className="chart-title-container">
            <h1 className="arabic" style={{ direction: "rtl" }}>
              أعطال عدادات الكهرباء
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
          <div className="malfunctions-chart">
            <ResponsiveBar
              data={formatData(malfunctionsData, sortBy)}
              keys={["mal 1", "mal 2", "mal 3"]}
              indexBy={sortBy}
              margin={{ top: 20, right: 130, bottom: 60, left: 100 }}
              padding={0.15}
              groupMode="grouped"
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={["#86E3CE", "#D0E6A5", "#FFDD94", "#FA897B", "#CCABD8"]}
              borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={axisBottom}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "العدد",
                legendPosition: "middle",
                legendOffset: -60,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role="application"
              ariaLabel="Meters Malfunctions"
              barAriaLabel={function (e) {
                return (
                  e.id +
                  ": " +
                  e.formattedValue +
                  " in country: " +
                  e.indexValue
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Malfunctions;
