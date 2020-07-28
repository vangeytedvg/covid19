/***
 * File   : App.js
 * App    : corona2020
 * Type   : ReactJS
 * Author : Danny Van Geyte
 * LM     : 28/07/2020
 */
import React from 'react';
import Cards from './components/Cards/Cards';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Chart from './components/Chart/Chart'
import ChartSelector from './components/ChartSelector';
import VisitCountry from './components/VisitCountry';
import { fetchData } from './api/';
import styles from './App.module.css';
import banner from './img/banner.jpg';


class App extends React.Component {
  state = {
    data: {},
    country: '',
    chartType: '',  // When no country select the chart type selectors are not shown
    capital: {},
  }

  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    // Fetch data when the user changes country in the listbox
    const data =  await fetchData(country);
    
    //console.log("CAPITALLLL", capital[0].capital)
    // We set the chartType to bar here, so it will show up
    this.setState({data, country: country, chartType:'bar'});
  }

  // This method manages the selection of the type of chart to be drawn
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
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        {/* Pass in the country for the creation of the url to wikipedia */}
        {/* Passes the type of chart to be drawn */}
        <ChartSelector handleChartTypeChange={this.handleChartTypeChange} chartType={chartType}/> 
        <VisitCountry country={country} />
        <Chart data={data} country={country} chartType={chartType}/>
        <div>(c) By Danny Van Geyte</div>
      </div>
    );
  }
}

export default App;