import React, { useState, useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

/*
    What I had to do to make this work:
    1. Of course, declare this functional component
    2. Pass the handleChartTypeChange parameter to this component
    3. Use onChange event calling the passed function as a parameter
*/


const ChartSelector = ({ handleChartTypeChange, chartType }) => {
    console.log(handleChartTypeChange, chartType)
    return (
        <FormControl className="mt-4" component="fieldset">
            <FormLabel component="legend">Select type of chart for selected country</FormLabel>
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                    value="bar"
                    checked={chartType === "bar" ? true : false}
                    control={<Radio color="primary" />}
                    label="Bar Chart"
                    labelPlacement="top"
                    onChange={(e) => handleChartTypeChange(e.target.value)}
                />
                <FormControlLabel
                    value="pie"
                    control={<Radio color="primary" />}
                    label="Pie Chart"
                    checked={chartType === "pie" ? true : false}
                    labelPlacement="top"
                    onChange={(e) => handleChartTypeChange(e.target.value)}
                />
            </RadioGroup>
        </FormControl>
    )
}

export default ChartSelector;