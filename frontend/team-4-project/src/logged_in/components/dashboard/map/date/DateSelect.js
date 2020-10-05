import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import TimePicker from './TimePicker'

class DateSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Grid container direction='column' spacing={1} >
                <Grid item lg={12}>
                    Filter Dates
                </Grid>
                <Grid item lg={12}>
                  <TimePicker date={this.props.dates[0]} callback={this.props.callbackStart}/>
                </Grid>
                <Grid item lg={12}>
                    To
                </Grid>
                <Grid item lg={12}>
                  <TimePicker date={this.props.dates[1]} callback={this.props.callbackEnd}/>
                </Grid>
                <Grid item lg={12}>
                    <Button color={"primary"} variant={"contained"} onClick={this.props.callbackDate}>
                        Update
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default DateSelect;