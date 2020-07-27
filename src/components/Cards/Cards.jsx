import React from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@material-ui/core';
import styles from '../Cards/Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';

// Destructuring used again here, but because in the App.js we only pass the 'data' 
// prop, we need to desctructre data too
const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
    if (!confirmed) {
      return (
          <div>
            <CircularProgress />
            <p>Loading API Data</p>
          </div>
      )
    }
    // Now we have data, so show it
    return (
        <div className="container">
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Confirmed
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <CountUp 
                                start={0}
                                end={confirmed.value}
                                duation={2.5}
                                separator=","
                            />                            
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Nr of activate cases of COVID-19
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Recovered
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <CountUp 
                                start={0}
                                end={recovered.value}
                                duation={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Nr of recoveries from COVID-19
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Deaths
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <CountUp 
                                start={0}
                                end={deaths.value}
                                duation={2.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color="textSecondary">
                            {new Date(lastUpdate).toDateString()}
                        </Typography>
                        <Typography variant="body2">
                            Nr of deaths caused by COVID-19
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;