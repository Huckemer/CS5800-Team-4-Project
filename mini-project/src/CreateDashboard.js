import TextField from "@material-ui/core/TextField";
import React, { Component } from "react";
import { Typography, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default class CreateDashboard extends Component {
    constructor(props){
      super(props)
      console.log(this);
      this.state = {
        email:"",
        password:"",
        firstName: "",
        lastName:"",
        userType:"",
      }
    }
    
    setParentState = () => {
        this.props.logout("");
      };
   
      createUserAccount = async(e) => {
          e.preventDefault();
        const response= await fetch(`http://localhost:5000/api/users/add?email=${this.state.email}&passwrd=${this.state.password}&firstName=${this.state.firstName}&lastName=${this.state.lastName}&userRole=${this.state.userType}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          },
          ).catch(err=>console.error(err))
          this.props.logout("");
        const res = await response.json();
        console.log(res);
      }
    
    render() {
        
      return (
        <>
            <Typography variant="h4" gutterBottom>Create Account</Typography>
            <div style ={{height: 200}}>
                <form onSubmit={this.createUserAccount} noValidate autoComplete="off">
                <TextField
                  id="filled-basic"
                  label="Enter Email"
                  variant="filled"
                  color="primary"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <TextField
                  id="filled-basic"
                  label="Password"
                  type = "password"
                  variant="filled"
                  color="primary"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <TextField
                  id="filled-basic"
                  label="Enter First Name"
                  variant="filled"
                  color="primary"
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                />
                <TextField
                  id="filled-basic"
                  label="Enter Last Name"
                  variant="filled"
                  color="primary"
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                />
                <FormControl style={{minWidth:100}}>
                    <InputLabel id="filled-basic">User Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="filled-basic"
                            variant = "filled"
                            value={this.state.userType}
                            onChange = {(e)=>this.setState({userType: e.target.value})}
                        >
                        <MenuItem value={"driver"}>Driver</MenuItem>
                        <MenuItem value={"rider"}>Rider</MenuItem>
                        </Select>
                </FormControl>
                <Grid item xs={12}>
                  <Button type="submit" variant="outlined" color="primary">
                    Create Account
                  </Button>
                </Grid>
        </form>
        <Box mt={4}>
        <Typography variant="h6" gutterBottom>Already have an account?</Typography>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={this.setParentState}
          >
            Sign in
          </Button>
        </Box>
    </div>
    </>
      );
    }
  }

