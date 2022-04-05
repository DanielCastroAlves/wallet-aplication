import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdEmail, MdLock } from 'react-icons/md';
import { guardarEmail } from '../actions';
import './login.css';

const NUMBER_MIN_CARACTER = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const { type, value } = target;
    this.setState({ [type]: value }, () => this.habilitarButton());
  }

  verificaEmail = (email) => {
    const padraoEmail = /\S+@\S+\.\S+/;
    return padraoEmail.test(email);
  };
  // codigo para validaçao do email tirado de:
  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

  habilitarButton = () => {
    const { email, password } = this.state;
    if (this.verificaEmail(email) && password.length >= NUMBER_MIN_CARACTER) {
      this.setState({
        buttonDisable: false,
      });
    } else {
      this.setState({
        buttonDisable: true,
      });
    }
  }

  buttonClick = () => {
    const { dispatchGuardaEmail, history } = this.props;
    const { email } = this.state;
    dispatchGuardaEmail(email);
    history.push('/carteira');
  }

  render() {
    const { buttonDisable, email, password } = this.state;
    return (
      <form>

        <div className="login">
          <div className="login-logo">
            <img
              src="https://icon-library.com/images/wallet-icon-png/wallet-icon-png-19.jpg"
              alt="Login App"
            />
          </div>

          <div className="login-direita">
            <h1>TrybeWallet</h1>

            <div className="login-loginInputEmail">
              <MdEmail />
              <input
                data-testid="email-input"
                type="email"
                placeholder="Digite seu email"
                value={ email }
                name="email"
                id="email"
                onChange={ this.handleChange }
              />

            </div>

            <div className="login-loginInputPassword">
              <MdLock />

              <input
                data-testid="password-input"
                type="password"
                placeholder="Digite sua senha"
                value={ password }
                name="password"
                id="password"
                onChange={ this.handleChange }
              />

            </div>

            <button
              type="submit"
              disabled={ buttonDisable }
              onClick={ this.buttonClick }
            >
              Entrar
            </button>

          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchGuardaEmail: (email) => dispatch(guardarEmail(email)),
});
export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchGuardaEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
