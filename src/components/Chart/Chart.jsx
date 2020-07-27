import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar, Pie } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country, chartType }) => {
  console.log('COUNTRY : ' + country)
  // Set our tate
  const [dailyData, setDailyData] = useState({});
  const [chart, setChart] = useState('');
    console.log('KIND OF CHART ' + chartType)

  useEffect(() => {
    // Because useEffect is synchronous we need to create a new function
    // inside it with is asynced
    const fetchAPI = async () => {
      const initialDailyData = await fetchDailyData();
      setDailyData(initialDailyData);
      setChart(chartType);
    }

    fetchAPI();
  }, [setChart]);

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
      ) : null
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
      ) : null
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
    ) : null
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