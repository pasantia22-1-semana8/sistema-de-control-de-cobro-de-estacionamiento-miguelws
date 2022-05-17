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
    modalCreateIsOpen: false,
    modalDeleteIsOpen: false,
    ticketsList: [],
    selectedPayment: [],
    newTicket: {
      codigo: undefined,
      pago: undefined
    },
    ticketId: undefined
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

  handleSendTicket = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await fetch('http://127.0.0.1:8000/api/v1/stays/tickets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.myToken}`
        },
        body: JSON.stringify(this.state.newTicket)
      }).then(data => data.json());

      this.setState({ modalCreateIsOpen: false });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleChange = e => {
    this.setState({
      newTicket: {
        [e.target.name]: e.target.value
      }
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
      await fetch('http://127.0.0.1:8000/api/v1/stays/payments/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.myToken}`
        }
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          selectedPayment: data,
          loading: false
        });
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

              onOpenModalCreate={this.handleOpenModalCreate}
              onCloseModalCreate={this.handleCloseModalCreate}
              modalCreateIsOpen={this.state.modalCreateIsOpen}
              onCreateTicket={this.handleSendTicket}
              onChange={this.handleChange}
              payments={this.state.selectedPayment}

              onOpenModalDelete={this.handleOpenModalDelete}
              onCloseModalDelete={this.handleCloseModalDelete}
              modalDeleteIsOpen={this.state.modalDeleteIsOpen}
              getTicketId={this.handleGetTicketId}
              onDeleteTicket={this.handleRemoveTicket}
            />
          </div>
        </div>
      </div>
    );
  }
}