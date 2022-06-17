import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { setEmail, setPassword } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

handleSubmit = (event) => {
  event.preventDefault();
  const { dispatch, history } = this.props;
  const { email, password } = this.state;
  dispatch(setEmail(email));
  dispatch(setPassword(password));
  history.push('/carteira');
}

render() {
  const { email, password } = this.state;
  const minLength = 6;
  const regex = /\S+@\S+\.\S+/;
  return (
    <main>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="email"
          value={ email }
          onChange={ (e) => this.setState({ email: e.target.value }) }
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="password"
          value={ password }
          onChange={ (e) => this.setState({ password: e.target.value }) }
          data-testid="password-input"
        />
      </form>
      <button
        type="submit"
        disabled={ !(password.length >= minLength && regex.test(email)) }
        onClick={ this.handleSubmit }
      >
        Entrar

      </button>
    </main>
  );
  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  // func de verificacao linha 15
}
}

Login.propTypes = {
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default connect()(Login);
