import React, { useState, useEffect } from 'react';
//npm i react-chartjs-2
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        points: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callback: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    }, 
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0.0a");
                    },
                },
            },
        ],
    },
}
const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

function LineGraph({ casesType = "cases", ...props }) {
    const [data, setData] = useState({});

    //https://disease.sh/v3/covid-19/historical/all?lastdays=120

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    //clever stuff here...
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                });
        }

        fetchData();
    }, [casesType]);

    return (
        <div className={props.className}>
            {data?.length > 0 && (  //check if data exists
                <Line
                    options={options}
                    data={{
                        datasets: [{
                            backgroundColor: 'rgba(204, 16, 51, 0.5)',
                            borderColor: '#CC1034',
                            data: data,
                        },
                        ],
                    }}
                />
            )}

        </div>
    )
}

export default LineGraph
