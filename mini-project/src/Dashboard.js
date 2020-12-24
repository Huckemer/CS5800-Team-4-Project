import { React, Component } from 'react';
import API from './API';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            color: "",
        }
    }

    handleClick = () => {
        this.getData();
    }

    getData = async() => {
        console.log("Pre Click: " + this.state.color)
        let color = await JSON.stringify(API.get('/color/'))
        // this.setState({ color: color })
        console.log("Post Click: " + color)
    }

    render() {
        const classes = this.props;
        
        return (
            <div className="dashboard" style={{backgroundColor: this.state.color}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <form noValidate autoComplete="off">
                            <TextField id="filled-basic" label="Fill Me In" variant="filled" />
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography >{this.state.text}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={this.handleClick()}>Make It Beautiful</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default Dashboard;