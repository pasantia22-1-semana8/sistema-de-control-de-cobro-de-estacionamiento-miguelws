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
    modalCreateIsOpen: false,
    modalDeleteIsOpen: false,
    staysList: [],
    selectedVehicle: [],
    newStay: {
      vehiculo: undefined
    },
    stayId: undefined
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

  handleRemoveStay = async (e) => {
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

  handleGetStayId = (id) => {
    this.setState({
      stayId: id
    });
  }

  handleCloseModalDelete = e => {
    this.setState({ modalDeleteIsOpen: false });
  }

  handleOpenModalDelete = e => {
    this.setState({ modalDeleteIsOpen: true });
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
              onCreateStay={this.handleSendStay}
              onChange={this.handleChange}
              vehicles={this.state.selectedVehicle}

              onOpenModalDelete={this.handleOpenModalDelete}
              onCloseModalDelete={this.handleCloseModalDelete}
              modalDeleteIsOpen={this.state.modalDeleteIsOpen}
              getStayId={this.handleGetStayId}
              onDeleteStay={this.handleRemoveStay}
            />
          </div>
        </div>
      </div>
    );
  }
}