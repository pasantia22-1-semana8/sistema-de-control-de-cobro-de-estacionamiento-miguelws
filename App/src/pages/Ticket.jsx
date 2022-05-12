import {React, Component} from "react";

import './styles/Stay.css';
import TicketsList from '../components/ticket/List';
import Layout from '../layouts/Layout';
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
    }
  }

  componentDidMount() {
    this.loadTickets();
    this.intervalId = setInterval(this.loadTickets, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  loadTickets = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await fetch('http://127.0.0.1:8000/api/v1/stays/tickets/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.myToken}`
        }
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          ticketsList: data,
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

  sendTicket = async e => {
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

  handleChange = e => {
    this.setState({
      newTicket: {
        [e.target.name]: e.target.value
      }
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
      return 'Loading...';
    }
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return (
      <Layout>
        <div className="Badges__container">
          <div className="Badges__list">
            <div className="Badges__container">
              <TicketsList
                tickets={this.state.ticketsList}

                onOpenModalCreate={this.handleOpenModalCreate}
                onCloseModalCreate={this.handleCloseModalCreate}
                modalCreateIsOpen={this.state.modalCreateIsOpen}
                onSubmitPost={this.sendTicket}
                onChange={this.handleChange}
                payments={this.state.selectedPayment}

                onOpenModalDelete={this.handleOpenModalDelete}
                onCloseModalDelete={this.handleCloseModalDelete}
                modalDeleteIsOpen={this.state.modalDeleteIsOpen}
                myToken={this.props.myToken}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}