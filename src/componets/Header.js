import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './header.css';

import { HiUserCircle } from 'react-icons/hi';
import { GiWallet } from 'react-icons/gi';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.valorAtualizado = () => {
      const { totalDespesaRecuperado } = this.props;
      return totalDespesaRecuperado
        .reduce((acc, curr) => acc + (Number(curr.value)
         * Number(curr.exchangeRates[curr.currency]
           .ask)), 0);
    };
  }

  render() {
    const { emailRecuperado } = this.props;
    return (
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <GiWallet
              size={ 45 }
            />

          </div>
          <h1>Trybe Wallet</h1>
        </div>
        <div className="conteiner-direita">
          <h2 data-testid="email-field" className="user-container">
            <div className="logo-user">
              <HiUserCircle
                size={ 35 }
              />
            </div>

            <p className="user-email">{`${emailRecuperado}`}</p>
          </h2>

          <div>
            <h2 className="valor-container">
              <div className="valor-container">
                Despesas:

              </div>

              <p data-testid="total-field" className="valor-number">
                R$

                {this.valorAtualizado().toFixed(2)}

              </p>
              <p data-testid="header-currency-field">
                BRL
              </p>
            </h2>

          </div>
        </div>

      </header>

    );
  }
}

/* class Header extends React.Component {
  render() {
    const { email, allDespesas } = this.props;

    return (
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <GiWallet
              size={ 45 }
            />

          </div>
          <h1>Trybe Wallet</h1>
        </div>
        <div className="conteiner-direita">
          <h2 data-testid="email-field" className="user-container">
            <div className="logo-user">
              <HiUserCircle
                size={ 35 }
              />
            </div>

            <p className="user-email">{`${emailRecuperado}`}</p>
          </h2>

          <div>
            <h2 data-testid="total-field" className="valor-container">
              <div className="valor-container">
                Despesas:

              </div>

              <p data-testid="total-field" className="valor-number">
                R$

                {this.valorAtualizado().toFixed(2)}

              </p>
              <p data-testid="header-currency-field">
                BRL
              </p>
            </h2>

          </div>
        </div>

      </header>
    );
  }
} */

const mapStateToProps = (state) => ({
  emailRecuperado: state.user.email,
  totalDespesaRecuperado: state.wallet.expenses,

});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  emailRecuperado: PropTypes.string.isRequired,
  totalDespesaRecuperado: PropTypes.shape({ root: PropTypes.number.isRequired }),
}.isRequired;
