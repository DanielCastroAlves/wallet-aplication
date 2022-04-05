import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { adicionarDespesas, guardarMoedas } from '../actions';
import './formDespesas.css';

class FormDespesas extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      moedasTipo: [],
      id: 0,

    };
  }

  componentDidMount() {
    this.fetchMoedas();
  }

  adicionarMoedas = () => {
    const { dispatchGuardarMoedas } = this.props;
    const { moedasTipo } = this.state;
    dispatchGuardarMoedas({

      moedasTipo,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  fetchMoedas = async () => {
    const buscar = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resposta = await buscar.json();
    const dadosMoedas = this.setState({ moedasTipo: Object.keys(resposta) });

    return dadosMoedas;
  }

  enviarDespesas = async () => {
    const { dispatchAdicionarDespesas } = this.props;
    const buscar = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await buscar.json();
    const {
      value,
      description,
      currency,
      method,
      tag,
      id,

    } = this.state;

    await dispatchAdicionarDespesas({
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,

    });
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: 0,
      description: '',
    }));
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
      moedasTipo,
    } = this.state;
    /* const { moedasTipo } = this.props; */
    return (
      <main className="inputs-form">
        <form className="wallet-form-esquerda">
          <div className="input-valor">
            <label htmlFor="value">
              <h3 className="input-label-h3">Valor:</h3>
              <input
                className="number-input"
                data-testid="value-input"
                type="number"
                id="value"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
          </div>

          <div className="input-descricao">
            <label htmlFor="description">
              <h3 className="input-label-h3">Descrição:</h3>
              <input
                data-testid="description-input"
                type="text"
                maxLength="15"
                id="description"
                name="description"
                value={ description }
                onChange={ this.handleChange }
                placeholder="Descrição despesa"
              />
            </label>
          </div>

          <div className="select-moedas">

            <label htmlFor="currency">

              <h3 className="select-label-h3">Moedas:</h3>
              <select
                data-testid="currency-input"
                id="currency"
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                {
                  moedasTipo.map((tipo) => tipo !== 'USDT'
                && (
                  <option
                    key={ tipo }
                    data-testid={ tipo }
                    value={ tipo }
                  >
                    {tipo}
                  </option>
                ))
                }
              </select>
            </label>
          </div>

          <label htmlFor="method" className="metodo">
            <h3 className="select-label-h3">Método de pagamento:</h3>
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag" className="tag">
            <h3 className="select-label-h3">Tag:</h3>
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <div className="button-add">
            <button
              type="button"
              onClick={ this.enviarDespesas }
            >
              Adicionar despesa

            </button>
          </div>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  moedasTipo: state.wallet.currencies,

});

const mapDispatchToProps = (dispatch) => ({
  dispatchAdicionarDespesas: (despesas) => dispatch(adicionarDespesas(despesas)),
  dispatchGuardarMoedas: (despesas) => dispatch(guardarMoedas(despesas)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesas);

FormDespesas.propTypes = {
  dispatchAdicionarDespesas: PropTypes.func.isRequired,
  dispatchGuardarMoedas: PropTypes.func.isRequired,
  /* moedasTipo: PropTypes.arrayOf.isRequired, */
};
