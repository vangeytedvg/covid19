/***
 * File   : VisitCountry.jsx
 * App    : corona2020
 * Type   : ReactJS
 * Author : Danny Van Geyte
 * LM     : 28/07/2020
 */
import React, { useState, useEffect } from 'react';
import img from '../img/wikipedia.jpeg';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase'

import styles from './VisitCountry.module.css'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export const VisitCountry = ({ country }) => {

    const classes = useStyles();

    const [appState, setAppState] = useState({
        loading: false,
        capital: '',
        flag: '',
        population: 0,
    });

    const [myCountry, setMyCountry] = useState('');
    const countryInfoUrl = 'https://restcountries.eu/rest/v2/name/#?fullText=true'

    // Need to use this method to refresh the url link.
    useEffect(() => {
        setAppState({ loading: true });
        setMyCountry({ myCountry: country })
        if (country) {
            const apiUrl = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
            console.log(apiUrl)
            axios.get(apiUrl)
                .then((countryinfo) => {
                    // Destructuring the info we get back from the restcountries api
                    const allInfo = countryinfo.data[0];
                    const { name, capital, flag, borders, population } = allInfo

                    // console.log(name, capital, flag, borders)
                    // borders.forEach((item) => {
                    //     console.log(item)
                    // })


                    setAppState({ loading: false, capital: capital, flag: flag, population: population });
                })
                .catch((err) => {
                    console.log("ERROR Occured : ", err)
                })
        };

        setAppState({ loading: false })
    }, [country])

    // Wikipedia base URL
    let baseUrl = 'https://en.wikipedia.org/wiki/'

    if (country) {
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img src={appState.flag} className={classes.img} alt="Flag" />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <a href={baseUrl + country} target="_blank" rel="noopener noreferrer">Find out more about {country}...</a>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Capital
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {appState.capital}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Population
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {appState.population}
                                    </Typography>

                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    } else {
        return (<div>Select a country for more details</div>)
    }
}

export default VisitCountry;