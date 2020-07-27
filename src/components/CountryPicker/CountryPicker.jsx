import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css'

// Passes handleCountyChange event handler
const CountryPicker = ({ handleCountryChange }) => {
    // Holds the list of countries
    const [fetchedCountries, setFetchedCountries] = useState([])

    useEffect(() => {
        const fetchAPI = async() => {
            // API Call
            setFetchedCountries(await fetchCountries());
        }
        fetchAPI();
        // Need to set the array below when we change countries
    }, [setFetchedCountries]);

    return (
        <FormControl className={styles.formControl}>
            {/* Calls handleCountryChange event handler */}
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                {/* The value here of global should contain an empty string.  Otherwise
                    if it contains something (eg 'Global') when the user would select this,
                    the API would fail!      
                */}
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;