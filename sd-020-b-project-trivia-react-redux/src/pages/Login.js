import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../components/styles/login.css';
import { requestInfo } from '../actions';
import getToken from '../services/api';
import music from '../components/styles/audio/song_intro.mp3';

class Login extends Component {
  audio = new Audio(music)

  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };
  }

  componentDidMount = () => {
    this.audio.play();
  }

  handleClick = async () => {
    const { userFunc, history } = this.props;
    const { name, email } = this.state;
    const token = await getToken();
    const gravatarEmail = md5(email).toString();
    userFunc(name, gravatarEmail);
    localStorage.setItem('token', token);
    history.push('/play');
    this.audio.pause();
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { name, email } = this.state;
    const regex = /\S+@\S+\.\S+/;

    return (

      <div className="loginPage">
        <header className="App-header current">
          <input
            type="text"
            name="name"
            onChange={ this.handleChange }
            placeholder="Nome"
            data-testid="input-player-name"
            className="inputLogin"
          />
          <input
            type="email"
            name="email"
            onChange={ this.handleChange }
            placeholder="Email"
            data-testid="input-gravatar-email"
            className="inputLogin"
          />
          <div className="loginButtons">
            <Link to="/setting">
              <button
                data-testid="btn-settings"
                name="setting"
                type="button"
                className="settingsBtn"
              >
                Settings
              </button>
            </Link>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !(name.length >= 1 && regex.test(email)) }
              onClick={ this.handleClick }
              className="playBtn"
            >
              Play
            </button>
          </div>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userFunc: (name, email) => dispatch(requestInfo(name, email)),
});

Login.propTypes = {
  userFunc: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
