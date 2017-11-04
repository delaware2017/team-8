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
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to _name_</h1>
          </header>
        <MuiThemeProvider>
          <UsernameAndPassword/>
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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChangePassword(event) {
    console.log("handle changed called: " + event.target.value);
    this.setState({
      password: event.target.value
    })
  }

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value
    })
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Please enter your username"
          floatingLabelText="Username"
          value={this.state.username}
          onChange={this.handleChange}
        /> <br/>
        <TextField
          hintText="Please enter your password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={this.handleChangePassword}
        /> <br/>
        <RaisedButton label="Log in" style={style}/>
      </div>
    )
  }
}

const style = {
  width: "50%",
  margin: "15px",
}

export default App;
