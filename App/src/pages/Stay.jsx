import {React, Component} from "react";

import './styles/Stay.css';
import StaysList from '../components/stay/List';
import api from '../service/Api';
import Loading from '../components/Loading';
import Error from '../pages/Error';

export default class Payment extends Component {
  state = {
    loading: true,
    error: null,
    staysList: [],
    modalCreateIsOpen: false,
    newStay: {
      vehiculo: undefined
    },
    selectedVehicle: [],
    modalDeleteIsOpen: false,
    stayId: undefined,
    modalCreateTicketIsOpen: false,
    newTicket: {
      codigo: undefined,
      estancia: undefined
    }
  }

  componentDidMount() {
    this.handleLoadStays();
    this.intervalId = setInterval(this.handleLoadStays, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleLoadStays = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      const data = await api.stays.list(this.props.myToken).then(data => data.json());
      this.setState({
        loading: false,
        staysList: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleSendStay = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await api.stays.create(this.props.myToken, this.state.newStay).then(data => data.json());
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
      newStay: { vehiculo: e.target.value }
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
      const data = await api.vehicles.list(this.props.myToken).then(data => data.json());
      this.setState({
        loading: false,
        selectedVehicle: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleGetStayId = (id) => {
    this.setState({
      stayId: id
    });
  }

  handleRemoveStay = async (e) => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await api.stays.remove(this.props.myToken, this.state.stayId).then(data => data.json());
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

  handleCloseModalDelete = e => {
    this.setState({ modalDeleteIsOpen: false });
  }

  handleOpenModalDelete = e => {
    this.setState({ modalDeleteIsOpen: true });
  }

  handleSendTicket = async (e) => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await api.tickets.create(this.props.myToken, this.state.newTicket).then(data => data.json());
      this.setState({
        loading: false,
        modalCreateTicketIsOpen: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleGetTicketData = (id) => {
    this.setState({
      newTicket: {
        codigo: Math.ceil(Math.random() * 10000) + '-' + Math.ceil(Math.random() * 10000) + '-' + Math.ceil(Math.random() * 10000),
        estancia: id
      }
    });
  }

  handleCloseModalCreateTicket = e => {
    this.setState({ modalCreateTicketIsOpen: false });
  }

  handleOpenModalCreateTicket = e => {
    this.setState({ modalCreateTicketIsOpen: true });
  }

  render() {
    if (this.state.loading === true && !this.state.staysList) {
      return <Loading/>;
    }
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return (
      <div className="Badges__container">
        <div className="Badges__list">
          <div className="Badges__container">
            <StaysList
              stays={this.state.staysList}

              onOpenModalCreate={this.handleOpenModalCreate}
              onCloseModalCreate={this.handleCloseModalCreate}
              modalCreateIsOpen={this.state.modalCreateIsOpen}
              onSaveStay={this.handleSendStay}
              onChange={this.handleChange}
              vehicles={this.state.selectedVehicle}

              onOpenModalDelete={this.handleOpenModalDelete}
              onCloseModalDelete={this.handleCloseModalDelete}
              modalDeleteIsOpen={this.state.modalDeleteIsOpen}
              getStayId={this.handleGetStayId}
              onDeleteStay={this.handleRemoveStay}

              onOpenModalCreateTicket={this.handleOpenModalCreateTicket}
              onCloseModalCreateTicket={this.handleCloseModalCreateTicket}
              modalCreateTicketIsOpen={this.state.modalCreateTicketIsOpen}
              getTicketData={this.handleGetTicketData}
              onCreateTicket={this.handleSendTicket}
            />
          </div>
        </div>
      </div>
    );
  }
}