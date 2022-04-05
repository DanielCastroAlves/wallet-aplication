import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editarDespesas } from '../actions';
import './formEdit.css';

class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    /* const { despTabela } = this.props;
    console.log(despTabela); */
    this.state = {
      moedasTipo: [],
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
      capturou: false,

    };
  }

  componentDidMount() {
    this.fetchMoedas();
  }

  componentDidUpdate() {
    this.funcSetState();
  }

  funcSetState = () => {
    const { despTabela } = this.props;
    const { capturou } = this.state;
    if (despTabela.length !== 0 && capturou === false) {
      const [expense] = despTabela;
      this.setState({
        value: expense.value,
        description: expense.description,
        currency: expense.currency,
        method: expense.method,
        tag: expense.tag,
        id: expense.id,
        exchangeRates: expense.exchangeRates,
        capturou: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  editDespesas = async () => {
    const { dispatchEditarDespesas } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,

    } = this.state;
    dispatchEditarDespesas({
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    });

    /*  this.setState((prevState) => ({
      id: prevState.id,
      value: 0,
      description: '',
    })); */
  };

   fetchMoedas = async () => {
     const buscar = await fetch('https://economia.awesomeapi.com.br/json/all');
     const resposta = await buscar.json();
     const dadosMoedas = this.setState({ moedasTipo: Object.keys(resposta) });

     return dadosMoedas;
   }

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
       <main className="editinputs-form">

         <form className="editwallet-form-esquerda">
           <div className="editinput-valor">
             <label htmlFor="value">
               <h3 className="editinput-label-h3">Valor:</h3>
               <input
                 className="editnumber-input"
                 data-testid="value-input"
                 type="number"
                 /* id={ id } */
                 name="value"
                 value={ value }
                 onChange={ this.handleChange }
               />
             </label>
           </div>

           <div className="editinput-descricao">
             <label htmlFor="description">
               <h3 className="editinput-label-h3">Descrição:</h3>
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

           <div className="editselect-moedas">

             <label htmlFor="currency">

               <h3 className="editselect-label-h3">Moedas:</h3>
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

           <label htmlFor="method" className="editmetodo">
             <h3 className="editselect-label-h3">Método de pagamento:</h3>
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

           <label htmlFor="tag" className="edittag">
             <h3 className="editselect-label-h3">Tag:</h3>
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

           <div className="editbutton-add">
             <button
               type="button"
               onClick={ this.editDespesas }
             >
               Editar despesa

             </button>
           </div>
         </form>
         );

       </main>
     );
   }
}
const mapStateToProps = (state) => ({
  despTabela: state.wallet.edit,
  moedasTipo: state.wallet.currencies,

});
const mapDispatchToProps = (dispatch) => ({
  dispatchEditarDespesas: (despesas) => dispatch(editarDespesas(despesas)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);

FormEdit.propTypes = {
  dispatchEditarDespesas: PropTypes.func.isRequired,
  moedasTipo: PropTypes.arrayOf.isRequired,
  despTabela: PropTypes.shape({ root: PropTypes.number.isRequired }),
}.isRequired;
