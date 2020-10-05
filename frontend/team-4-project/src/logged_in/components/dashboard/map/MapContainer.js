import React, { Component } from 'react';
import MapBox from './Map';
import MomentUtils from '@date-io/moment';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const mom = new MomentUtils();

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            start: mom.parse('2017-08-12', 'YYYY-MM-DD'),
            end: mom.parse('2017-10-12', 'YYYY-MM-DD'),
            filters: {
                tornado: true,
                hurricane: true,
                severestorm: true,
                fire: true,
                ice: true,
                flood: true,
                freezing: true,
                earthquake: true,
                snow: true,
                costalstorm: true,
                typhoon: true,
            }
        };
        this.map = React.createRef();
    }

    callbackStart = (date, value) => {
        this.setState({start: mom.parse(date, 'YYYY-MM-DD')});
    }
    
    callbackEnd = (date, value) => {
        this.setState({end: mom.parse(date, 'YYYY-MM-DD')});
    }
    
    callbackDate = () => {
        this.map.current.updateMap();
        this.props.dateCallback(this.state.start.format('YYYY-MM-DD'), this.state.end.format('YYYY-MM-DD'));
    }

    checkCallback = (name) => {
        name = name.toLowerCase();
        name = name.replace(/\s+/g, '');
        // console.log(name);
        var copy = JSON.parse(JSON.stringify(this.state.filters))
        copy[name] = !this.state.filters[name]
        this.setState({
            filters: copy,
            }
        );
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12}>
                    <Paper >
                        <MapBox filters={this.state.filters} ref={this.map} sql_connection={this.state.connection} start={mom.format(this.state.start, 'YYYY-MM-DD')} end={mom.format(this.state.end, 'YYYY-MM-DD')}/>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default MapContainer;