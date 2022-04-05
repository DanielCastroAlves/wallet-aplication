import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componets/Header';
import FormDespesas from '../componets/FormDespesas';
import Table from '../componets/Table';
import FormEdit from '../componets/FormEdit';

class Wallet extends React.Component {
  render() {
    const { stateForm } = this.props;
    return (
      <>
        <Header />

        {stateForm !== undefined && stateForm === true ? <FormEdit /> : <FormDespesas /> }

        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  stateForm: state.wallet.formEditVisibled,

});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  stateForm: PropTypes.PropTypes.bool,
}.isRequired;
