import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { capturaDespesasEdit, deletarDespesas } from '../actions';
import './table.css';

class Table extends React.Component {
  render() {
    const {
      despesasTabela,
      dispatchDeleteDespesa,
      dispatchCapturaDespesaEdit,
    } = this.props;
    return (
      <table className="tabela">
        <thead className="cabecalho">
          <tr className="tr-cabecalho">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className="corpo">
          {despesasTabela.map((info) => {
            const { value, description, currency, method, tag, exchangeRates } = info;
            const valor = Number(value).toFixed(2);
            const cambio = Number(exchangeRates[currency].ask).toFixed(2);
            const nomeMoeda = exchangeRates[currency].name.split('/');
            const valorConvertido = (valor * exchangeRates[currency].ask).toFixed(2);
            return (

              <tr key={ info.id } className="tr-corpo">
                <td className="description">{description}</td>
                <td className="tag-table">{tag}</td>
                <td className="method">{method}</td>
                <td className="valor">{valor}</td>
                <td className="moeda">{nomeMoeda[0]}</td>
                <td className="cambio">{cambio}</td>
                <td className="valorConvertido">{valorConvertido}</td>
                <td className="real">Real</td>

                <td className="button-container">
                  <button
                    data-testid="edit-btn"
                    className="edite"
                    type="button"
                    onClick={ () => dispatchCapturaDespesaEdit(
                      info.id,
                    ) }
                  >
                    Editar
                  </button>
                  <button
                    className="delete"
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => dispatchDeleteDespesa(
                      info.id,
                    ) }
                  >
                    Excluir
                  </button>

                </td>

              </tr>

            );
          })}
        </tbody>
      </table>
    );
  }
}
// criação de table e em capsulamento das tags
// tiradas de https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead

const mapStateToProps = (state) => ({
  despesasTabela: state.wallet.expenses,

});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteDespesa: (payload) => dispatch(deletarDespesas(payload)),
  dispatchCapturaDespesaEdit: (payload) => dispatch(capturaDespesasEdit(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  despesasTabela: PropTypes.shape({ root: PropTypes.number.isRequired }),
}.isRequired;
