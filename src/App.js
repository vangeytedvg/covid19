import React from 'react';

import Cards from './components/Cards/Cards';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Chart from './components/Chart/Chart'
import ChartSelector from './components/ChartSelector';
import { fetchData, fetchDailyData } from './api/';
import styles from './App.module.css';
import banner from './img/banner.jpg';


class App extends React.Component {
  state = {
    data: {},
    country: '',
    chartType: 'bar',
  }

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    // Fetch data when the user changes country in the listbox
    const data =  await fetchData(country);
    this.setState({data, country: country});
  }

  handleChartTypeChange = (chartType) => {
    this.setState({chartType})
  }

  render() {
    // Need to desctructure both vars here because they are declared toghether 
    // in the state object
    const { data, country, chartType } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={banner} alt='COVID-19'/>
        <Cards data={data} />
        {/* Will call the above function handleCountryChange */}
        <ChartSelector handleChartTypeChange={this.handleChartTypeChange} chartType={chartType}/> 
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} chartType={chartType}/> 
      </div>
    );
  }
}

export default App;