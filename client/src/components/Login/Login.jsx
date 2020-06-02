import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import IPinfo from 'node-ipinfo';
import Axios from 'axios';
import FadeIn from 'react-fade-in';
import PropTypes from 'prop-types';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image_url: '',
      google_id: '',
      latitude: '',
      longitude: '',
      city: '',
      region: '',
      view: false,
      view2: false,
    };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }

  getUserLocation() {
    const token = 'd7336b6238ccfc';
    const ip = 'geo';
    const ipinfo = new IPinfo(token);
    const { getLocationFromLogin } = this.props;
    ipinfo.lookupIp(ip)
      .then((response) => {
        const loc = response.loc.split(',');
        getLocationFromLogin(loc[0], loc[1], response._city, response.region);
        this.setState({
          latitude: loc[0],
          longitude: loc[1],
          city: response._city,
          region: response.region,
          view2: true,
        });
        Axios.post('api/login', this.state)
          .then((res) => res)
          .catch((err) => err);
      })
      .catch((error) => error);
  }

  responseGoogle(response) {
    const { getUserInfo } = this.props;
    this.setState({
      name: response.profileObj.name,
      image_url: response.profileObj.imageUrl,
      google_id: response.googleId,
      view: true,
    });
    getUserInfo(this.state);
  }

  render() {
    const {
      name, image_url, view, view2,
    } = this.state;
    return (
      <div className="loginGoogle">
        <div className="loginDescription loginPara">
          <FadeIn>
            <h1 className="loginTitle">♥ HOWDY ♥</h1>
            <h2 className="loginColor"> get to know your neighbors </h2>
          </FadeIn>
          {view === false ? (
            <div>
              <GoogleLogin
                clientId="803513597131-em8ms5faq80vjshvdhcnhrkd3hdegta5.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                isSignedIn
                cookiePolicy="single_host_origin"
              />
            </div>
          ) : null }
          {view === true ? (
            <div className="loginSigned" align="center">
              <h3>You have signed in as:</h3>
              <div>{name}</div>
              <div>
                <img src={image_url} alt="" />
              </div>
              {view2 === false ? (
                <div>
                  <div className="firstSpan colorSpan">{" When you're stuck inside, it can feel lonely."}</div>
                  <div className="colorSpan"> Why not throw an online party? </div>
                  <div className="lastSpan colorSpan"> Connect with your neighbors based on your location: </div>
                  <button type="button" className="btn btn-primary" onClick={this.getUserLocation}> Share location </button>
                </div>
              ) : (
                <Link to={{ pathname: '/parties' }}>
                  <button type="button" className="btn btn-primary continue"> Continue to Parties Page! </button>
                </Link>
              )}
              {/* <div> Or enter your zip code! </div>
              <input placeholder="zip code" />
              <Link to={{ pathname: '/parties' }}>
                <button className="btn btn-primary"> Submit </button>
              </Link> */}
            </div>
          ) : null }
        </div>
      </div>
    );
  }
}

LogIn.propTypes = {
  getLocationFromLogin: PropTypes.func,
  getUserInfo: PropTypes.func,
};

LogIn.defaultProps = {
  getLocationFromLogin: () => {},
  getUserInfo: () => {},
};

export default LogIn;
