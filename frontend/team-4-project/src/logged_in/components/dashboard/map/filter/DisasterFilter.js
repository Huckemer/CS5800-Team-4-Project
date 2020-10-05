import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import * as checkboxes from './Checkboxes'

class DisasterFilter extends Component {
    constructor(props) {
        super(props);
        this.state = { filters: [
            {
                name: 'Tornado',
                box: checkboxes.TornadoCheckbox,
                checked: true
            },{
                name: 'Hurricane',
                box: checkboxes.HurricaneCheckbox,
                checked: true
            },{
                name:'Severe Storm',
                box: checkboxes.SevereStormCheckbox,
                checked: true
            },{
                name:'Fire',
                box: checkboxes.FireCheckbox,
                checked: true
            },{
                name:'Ice Storm',
                box: checkboxes.IceStormCheckbox,
                checked: true
            },{
                name:'Flood',
                box: checkboxes.FloodCheckbox,
                checked: true
            },{
                name:'Freezing',
                box: checkboxes.FreezingCheckbox,
                checked: true
            },{
                name:'Earthquake',
                box: checkboxes.EarthquakeCheckbox,
                checked: true
            },{
                name:'Snow',
                box: checkboxes.SnowCheckbox,
                checked: true
            },{
                name:'Costal Storm',
                box: checkboxes.CostalStormCheckbox,
                checked: true
            },{
                name:'Typhoon',
                box: checkboxes.TypoonCheckbox,
                checked: true
            }] };
    }

    filterCallback = (event) => {
        var eventIndex = this.state.filters.findIndex(element => element.name === event.target.name);
        //console.log(event.target, event.target.checked);
        this.setState(state => {
            const filter = state.filters.map((item, j) => {
                if( j === eventIndex){
                    return {
                        ...item,
                        checked: !item.checked
                    }
                }else{
                    return item
                }
            })
            return{
                filters: filter
            }
        })
        this.props.checkCallback(event.target.name);
    }

    renderChecks(){
        var this_ = this
        return this.state.filters.map(function (point){
            return <FormControlLabel
                control={<point.box checked={point.checked}  name={point.name}/>}
                    label={point.name} onChange={this_.filterCallback}
            />
        })
    }

    render() {
        return (
            <FormControl component="fieldset" >
                <FormLabel component="legend">Filter Disasters</FormLabel>
                    <FormGroup>
                        {this.renderChecks()}
                    </FormGroup>
            </FormControl>
            
        );
    }
}

export default DisasterFilter;