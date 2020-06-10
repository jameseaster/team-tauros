import React from 'react';
import {
  HashRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import Axios from 'axios';
import AlertTemplate from 'react-alert-template-mui';
import { Provider as AlertProvider } from 'react-alert';

import Parties from './PartyCreation/Parties.jsx';
import Login from './Login/Login.jsx';
import Chatroom from './PartyRoom/ChatRoom.jsx';

// Options for the alert provider
const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      partyInfo: {},
      userInfo: {},
      view: false,
      longitude: '',
      latitude: '',
      city: '',
      region: '',
      redirect: false,
    };
    this.getPartyInfo = this.getPartyInfo.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.getUserLocationFromDB = this.getUserLocationFromDB.bind(this);
    this.getLocationFromLogin = this.getLocationFromLogin.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        view: true,
      });
      const { userInfo } = this.state;
      if (!userInfo.name) {
        this.setRedirect();
      }
    }, 1000);
  }

  getPartyInfo(partyInfo) {
    this.setState({ partyInfo });
  }

  getUserInfo(userInfo) {
    this.setState({ userInfo });
  }

  getLocationFromLogin(latitude, longitude, city, region) {
    this.setState({
      latitude, longitude, city, region,
    });
  }

  getUserLocationFromDB() {
    const { userInfo } = this.state;
    Axios.get('/api/login', { params: { google_id: userInfo.googleId } })
      .then((res) => {
        this.setState({ longitude: res.data[0].longitude, latitude: res.data[0].latitude });
      })
      .catch((err) => err);
  }

  setRedirect() {
    this.setState({
      redirect: true,
    });
  }

  responseGoogle(response) {
    this.setState({
      userInfo: response.profileObj,
    });
    this.getUserLocationFromDB();
    const { userInfo } = this.state;
    if (!userInfo.name) {
      this.setState({
        redirect: true,
      });
    }
  }

  renderRedirect() {
    const { redirect } = this.state;
    if (!redirect) {
      return null;
    }
    return <Redirect to="/" />;
  }

  render() {
    const {
      partyInfo, userInfo, view, longitude, latitude, city, region,
    } = this.state;
    let renderContainer = (
      <div>
        <div className="hideMe">
          <GoogleLogin
            clientId="803513597131-flgnf4p6qarf2arn1003grv98m8vn21q.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.setRedirect}
            isSignedIn
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    );
    if (view) {
      renderContainer = (
        <AlertProvider template={AlertTemplate} {...options}>
          <HashRouter>
            {this.renderRedirect()}
            <Switch>
              <Route exact path="/" render={() => (<Login getUserInfo={this.getUserInfo} getLocationFromLogin={this.getLocationFromLogin} />)} />
              <Route exact path="/parties" render={() => (<Parties longitude={longitude} latitude={latitude} city={city} region={region} getPartyInfo={this.getPartyInfo} imageUrl={userInfo.image_url} />)} />
              <Route exact path="/chatroom" render={() => (<Chatroom partyInfo={partyInfo} username={userInfo.name} />)} />
            </Switch>
          </HashRouter>
        </AlertProvider>
      );
    }
    return (
      renderContainer
    );
  }
}

export default App;
