import React from 'react';

import Cards from './components/Cards/Cards';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Chart from './components/Chart/Chart'
import { fetchData } from './api/';
import styles from './App.module.css';

class App extends React.Component {
  state = {
    data: {},
  }

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  render() {
    const { data } = this.state;

    return (
      <div className={styles.container}>
        
        <Cards data={data} />
        <CountryPicker  />
        <Chart data={data}/> 
      </div>
    );
  }
}

export default App;