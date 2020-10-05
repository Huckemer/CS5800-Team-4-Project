import React, { Component } from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';

class TimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            date: this.props.date,
         };
    }

    render() {
        return (
            <KeyboardDatePicker autoOk 
            style={{marginRight: '5%'}}
            variant='standard' 
            minDate={new Date('1999-12-31')}
            maxDate={new Date('2018-01-18')} 
            format={'MM/DD/YYYY'} 
            value={this.props.date} 
            onChange={this.props.callback}/>
        );
    }
}

export default TimePicker;