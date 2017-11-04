import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import request from 'superagent';

class App extends Component {
    constructor() {
      super();
      this.changeViews = this.changeViews.bind(this);
      this.state = {
        showMainPage: true
      }
    }
    render() {
      return (
        <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to _name_</h1>
            </header>


            
            <MuiThemeProvider>

            {this.state.showMainPage && 
              <UsernameAndPassword changeViews={this.changeViews}/>
            }
            {!this.state.showMainPage && 
              <AdminPage/>
            }
            </MuiThemeProvider>
        </div>
      );
    }

    changeViews(event) {
      // Go from main page to admin page.
      this.setState({
        showMainPage: !this.state.showMainPage
      })
    }
}            


class AdminPage extends Component {
        constructor(props) {
          super(props);
          this.state = {

          }
        }

        render() {
          return (
            <div className="AdminPage">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="Admin-title">Administrative records</h1>
                </header>

              <MuiThemeProvider>
              {this.state.showMainPage && 
                <UsernameAndPassword changeViews={this.changeViews}/>
              }
              {!this.state.showMainPage && 
                <AdminPage/>
              }
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
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.auth = this.auth.bind(this);
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
          onChange={this.handleChangeUsername}
        /> <br/>
        <TextField
          hintText="Please enter your password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={this.handleChangePassword}
        /> <br/>
        <RaisedButton label="Log in" style={style} onClick={this.auth}/>
      </div>
    )
  }

  auth() {
      // if succesfull, call this.props.changeViews
      if (this.state.username.length < 1 || this.state.username.length < 1) {
        alert("Please make sure you enter both a username and password.");
        return;
      }

        fetch('http://localhost:3001' + '/alogin', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
        body: formBody
      })
      .then((res) => {
        console.log("res: " + JSON.stringify(res));
      })
  }
}

const style = {
  width: "50%",
  margin: "15px",
}

export default App;
