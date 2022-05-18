import {React, Component} from "react";

import './styles/Stay.css';
import TicketsList from '../components/ticket/List';
import api from '../service/Api';
import Loading from '../components/Loading';
import Error from '../pages/Error';

export default class Ticket extends Component {
  state = {
    loading: true,
    error: null,
    ticketsList: [],
    modalDeleteIsOpen: false,
    ticketId: undefined,
    modalCreatePaymentIsOpen: false,
    newPayment: {
      ticket: undefined
    },
    stayId: undefined
  }

  componentDidMount() {
    this.handleLoadTickets();
    this.intervalId = setInterval(this.handleLoadTickets, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleLoadTickets = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      const data = await api.tickets.list(this.props.myToken).then(data => data.json());
      this.setState({
        loading: false,
        ticketsList: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }
  
  handleRemoveTicket = async (e) => {
    try {
      await api.tickets.remove(this.props.myToken, this.state.ticketId).then(data => data.json());
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

  handleGetTicketId = (id) => {
    this.setState({
      ticketId: id
    });
  }

  handleCloseModalDelete = e => {
    this.setState({ modalDeleteIsOpen: false });
  }

  handleOpenModalDelete = e => {
    this.setState({ modalDeleteIsOpen: true });
  }

  handleSendPayment = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await api.stays.update(this.props.myToken, this.state.stayId).then(data => data.json());
      await api.tickets.remove(this.props.myToken, this.state.ticketId).then(data => data.json());
      await api.payments.create(this.props.myToken, this.state.newPayment).then(data => data.json());
      this.setState({
        loading: false,
        modalCreatePaymentIsOpen: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleGetPaymentData = (id) => {
    this.setState({
      newPayment: {
        ticket: id
      }
    });
  }

  handleCloseModalCreatePayment = e => {
    this.setState({ modalCreatePaymentIsOpen: false });
  }

  handleOpenModalCreatePayment = e => {
    this.setState({ modalCreatePaymentIsOpen: true });
  }

  handleGetStayId = (id) => {
    this.setState({
      stayId: id
    });
  }

  render() {
    if (this.state.loading === true && !this.state.ticketsList) {
      return <Loading/>;
    }
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return (
      <div className="Badges__container">
        <div className="Badges__list">
          <div className="Badges__container">
            <TicketsList
              tickets={this.state.ticketsList}

              onOpenModalDelete={this.handleOpenModalDelete}
              onCloseModalDelete={this.handleCloseModalDelete}
              modalDeleteIsOpen={this.state.modalDeleteIsOpen}
              getTicketId={this.handleGetTicketId}
              onDeleteTicket={this.handleRemoveTicket}

              onOpenModalCreatePayment={this.handleOpenModalCreatePayment}
              onCloseModalCreatePayment={this.handleCloseModalCreatePayment}
              modalCreatePaymentIsOpen={this.state.modalCreatePaymentIsOpen}
              getPaymentData={this.handleGetPaymentData}
              onCreatePayment={this.handleSendPayment}
              getStayId={this.handleGetStayId}
            />
          </div>
        </div>
      </div>
    );
  }
}