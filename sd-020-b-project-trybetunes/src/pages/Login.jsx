import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Components/Loading';

class Login extends React.Component {
  render() {
    const { handleSbmt, disabled, user, buttonAble, loading } = this.props;

    return (
      <div data-testid="page-login">
        { loading ? (<Loading />) : (
          <section>
            <input
              type="text"
              name="user"
              data-testid="login-name-input"
              onChange={ buttonAble }
              value={ user }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              onClick={ handleSbmt }
              disabled={ disabled }
            >
              Entrar
            </button>
          </section>)}
      </div>
    );
  }
}

Login.propTypes = {
  handleSbmt: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  buttonAble: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Login;
