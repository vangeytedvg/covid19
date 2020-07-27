import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: {confirmed, recovered, deaths}, country}) => {

    // Set our tate
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        // Because useEffect is synchronous we need to create a new function
        // inside it with is asynced
        const fetchAPI = async () => {
            const initialDailyData = await fetchDailyData();        
            setDailyData(initialDailyData);
        }
        
        fetchAPI();
    }, []);

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
      );
    return (
        <div className={styles.container}>
            {lineChart}
        </div>
        
    )
}

export default Chart;