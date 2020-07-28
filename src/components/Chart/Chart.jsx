/***
 * File   : ChartSelector.jsx
 * App    : corona2020
 * Type   : ReactJS
 * Author : Danny Van Geyte
 * LM     : 28/07/2020
 */
import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { CircularProgress } from '@material-ui/core';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country, chartType }) => {
  // Set our tate
  const [dailyData, setDailyData] = useState({});
  const [chart, setChart] = useState('');

  useEffect(() => {
    // Because useEffect is synchronous we need to create a new function
    // inside it with is asynced
    const fetchAPI = async () => {
      try {
        const initialDailyData = await fetchDailyData();
        setDailyData(initialDailyData);
      } catch(error) {
        const initialDailyData = ({'Error': 'Not Connected?'})
      }
      
      //setChart(chartType);/
    }

    fetchAPI();
  }, [setChart, chartType]);

  const barChart = (
      confirmed ? (
        <Bar
          e
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
              {                
                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                data: [confirmed.value, recovered.value, deaths.value],
              },
            ],
          }}
          options={{
            legend: { display:false },
            title: { display: true, text: `Current state in ${country}` },
          }}
        />
      ) : (<div className="container">
            <CircularProgress />
          </div>)
    );

  const pieChart = (
      confirmed ? (
        <Pie
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
              {
                
                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                data: [confirmed.value, recovered.value, deaths.value],
              },
            ],
          }}
          options={{
            legend: { display: true },
            title: { display: true, text: `Current state in ${country}` },
          }}
        />
      ) : (<div className="container">
            <CircularProgress />
          </div>)
    );
  

  // The linechart is drawn only when dailydata[0] contains data
  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : (<div className="container">
          <CircularProgress />
        </div>)
  )

  switch (chartType) {
    case "pie":
      return (
        <div className={styles.container}>
          {/* if country contains something, draw the bar chart
                    otherwise draw the global line chart
                */}
          {country ? pieChart : lineChart}
        </div>
      )
   case "bar":
      return (
      <div className={styles.container}>
        {/* if country contains something, draw the bar chart
                  otherwise draw the global line chart
              */}
        {country ? barChart : lineChart}
      </div>
    )

    default: 
      return (
        <div className={styles.container}>
          {/* if country contains something, draw the bar chart
                    otherwise draw the global line chart
                */}
          {country ? barChart : lineChart}
        </div>
      )
  }
}

export default Chart;