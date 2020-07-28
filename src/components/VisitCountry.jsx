/***
 * File   : VisitCountry.jsx
 * App    : corona2020
 * Type   : ReactJS
 * Author : Danny Van Geyte
 */
import React, {useState, useEffect} from 'react';

export const VisitCountry = ({country}) => {
    const [myCountry, setMyCountry] = useState('');
    
    // Need to use this method to refresh the url link.
    useEffect(() => {
        setMyCountry(country)
    }, [country])

    //let baseUrl = 'https://www.google.com/search?q='
    let baseUrl = 'https://en.wikipedia.org/wiki/'

    if (country) {
        return (
            <div>
                <a href={baseUrl+country} target="_blank">Find out more about {country}...</a>                                
            </div>
    )} else {
        return (<></>)
    }
}

export default VisitCountry;

