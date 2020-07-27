import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

// Working with async / await is easier to read and write
// than .then and .catch

// Get the data for the cards component
export const fetchData = async () => {
    try {

        // destructor to get specific data
        const {data : {
            confirmed, recovered, deaths, lastUpdate
        }} = await axios.get(url);
        

        return { confirmed, recovered, deaths, lastUpdate };

    } catch (error) {
        console.log(error);
    }
}

// Get the data for the chart 
export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get('https://covid19.mathdro.id/api/daily');

      return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    } catch (error) {
        return error;
    }
  };