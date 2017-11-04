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
        showMainPage: true,
        patients: []
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
              <AdminPage patients={this.state.patients} />
            }
            </MuiThemeProvider>
        </div>
      );
    }

    changeViews(language) {
      console.log("Got here! " + JSON.stringify(language));
      // Go from main page to admin page.
      this.setState({
        showMainPage: !this.state.showMainPage,
        patients: language
      })
    }
}            


class AdminPage extends Component {
        constructor(props) {
          super(props);
          console.log(typeof this.props.patients);
          this.state = {
            patients: this.props.patients
          }
        }

        render() {
          return (
            <div id="wrapper">
            <link rel="stylesheet" href="assets/css/main.css" />
            <script src="assets/js/jquery.min.js"></script>
            <script src="assets/js/jquery.poptrox.min.js"></script>
            <script src="assets/js/skel.min.js"></script>
			      <script src="assets/js/util.js"></script>
            <script src="assets/js/main.js"></script>
            <div id="main">
              {
                this.props.patients.map((patient, index) => {
                  return (
                  <article className="thumb">
                    <a href="images/fulls/01.jpg" className="image"><img src="images/thumbs/01.jpg" alt="" /></a>
                    <h2 style={{'fontSize': '15px'}}><a href="">{patient.firstName} {patient.lastName}: Current balance: ${patient.balance}. Click to add.</a></h2>
                  </article>
                  )
                })
              }
                  <article className="thumb">
                    <a href="images/fulls/01.jpg" className="image"><img src="images/thumbs/01.jpg" alt="" /></a>
                    <h2 style={{'fontSize': '15px'}}><a href="">{patient.firstName} {patient.lastName}: Current balance: ${patient.balance}. Click to add.</a></h2>
                  </article>
            </div>
          </div>
          )
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

      const formBody = "username=" + this.state.username + "&password=" + this.state.password

      fetch('http://localhost:3000' + '/alogin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log("response json: " + JSON.stringify(responseJson));
        this.props.changeViews(responseJson);
      })
  }
}

const style = {
  width: "50%",
  margin: "15px",
}

export default App;
