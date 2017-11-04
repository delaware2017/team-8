import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to _name_</h1>
          </header>
          <p className="App-intro">
            <UsernameAndPassword/>
          </p>
        </MuiThemeProvider>
      </div>
    );
  }
}

class UsernameAndPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  render() {
    return (
      <div>
        <TextField
          hintText=""
        /> < br/>
        <TextField
          hintText="Please enter your password"
        /> <br/>
        <RaisedButton label="default" style={style}/>
      </div>
    )
  }
}

const style = {
  width: "50%",
  margin: "15px",
}

export default App;
