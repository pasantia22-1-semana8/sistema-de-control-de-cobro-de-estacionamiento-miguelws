import {React, Component} from "react";

import './styles/Stay.css';
import PaymentsList from '../components/payment/List';
import api from '../service/Api';
import Loading from '../components/Loading';
import Error from '../pages/Error';

export default class Payment extends Component {
  state = {
    loading: true,
    error: null,
    modalCreateIsOpen: false,
    modalDeleteIsOpen: false,
    paymentsList: [],
    selectedStay: [],
    newPayment: {
      estancia: undefined
    },
    paymentId: undefined
  }

  componentDidMount() {
    this.handleLoadPayments();
    this.intervalId = setInterval(this.handleLoadPayments, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleLoadPayments = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      const data = await api.payments.list(this.props.myToken).then(data => data.json());
      this.setState({
        loading: false,
        paymentsList: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleSendPayment = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await api.payments.create(this.props.myToken, this.state.newPayment).then(data => data.json());
      this.setState({
        loading: false,
        modalCreateIsOpen: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleChange = e => {
    this.setState({
      newPayment: { estancia: e.target.value }
    });
  }

  handleCloseModalCreate = e => {
    this.setState({ modalCreateIsOpen: false });
  }
  
  handleOpenModalCreate = async e => {
    this.setState({
      loading: true,
      error: null,
      modalCreateIsOpen: true
    });

    try {
      const data = await api.stays.list(this.props.myToken).then(data => data.json());
      this.setState({
        loading: false,
        selectedStay: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleRemovePayment = async (e) => {
    try {
      await api.payments.remove(this.props.myToken, this.state.paymentId).then(data => data.json());
      this.setState({
        loading: false,
        modalDeleteIsOpen: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleGetPaymentId = (id) => {
    this.setState({
      paymentId: id
    });
  }

  handleCloseModalDelete = e => {
    this.setState({ modalDeleteIsOpen: false });
  }

  handleOpenModalDelete = e => {
    this.setState({ modalDeleteIsOpen: true });
  }

  render() {
    if (this.state.loading === true && !this.state.paymentsList) {
      return <Loading/>;
    }
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return (
      <div className="Badges__container">
        <div className="Badges__list">
          <div className="Badges__container">
            <PaymentsList
              payments={this.state.paymentsList}

              onOpenModalCreate={this.handleOpenModalCreate}
              onCloseModalCreate={this.handleCloseModalCreate}
              modalCreateIsOpen={this.state.modalCreateIsOpen}
              onCreatePayment={this.handleSendPayment}
              onChange={this.handleChange}
              stays={this.state.selectedStay}

              onOpenModalDelete={this.handleOpenModalDelete}
              onCloseModalDelete={this.handleCloseModalDelete}
              modalDeleteIsOpen={this.state.modalDeleteIsOpen}
              getPaymentId={this.handleGetPaymentId}
              onDeletePayment={this.handleRemovePayment}
            />
          </div>
        </div>
      </div>
    );
  }
}