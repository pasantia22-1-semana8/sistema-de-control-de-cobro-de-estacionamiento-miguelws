import {React, Component} from "react";

import './styles/Stay.css';
import VehiclesList from '../components/vehicle/List';
import api from '../service/Api';
import Loading from '../components/Loading';
import Error from '../pages/Error';

export default class Vehicle extends Component {
  state = {
    loading: true,
    error: null,
    modalCreateIsOpen: false,
    modalDeleteIsOpen: false,
    vehiclesList: [],
    selectedFees: [],
    newVehicle: {
      placa: undefined,
      tarifa: undefined,
      descripcion: undefined
    },
    vehicleId: undefined
  }

  componentDidMount() {
    this.handleLoadVehicles();
    this.intervalId = setInterval(this.handleLoadVehicles, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleLoadVehicles = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      const data = await api.vehicles.list(this.props.myToken).then(data => data.json());
      this.setState({
        loading: false,
        vehiclesList: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleSendVehicle = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await api.vehicles.create(this.props.myToken, this.state.newVehicle).then(data => data.json());
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
    const data = this.state.newVehicle;
    data[e.target.name] = e.target.value;
    this.setState({ newVehicle: data });
  };

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
      const data = await api.fees.list(this.props.myToken).then(data => data.json());
      this.setState({
        loading: false,
        selectedFees: data
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleRemoveVehicle = async (e) => {
    try {
      await api.vehicles.remove(this.props.myToken, this.state.vehicleId).then(data => data.json());
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

  handleGetVehicleId = (id) => {
    this.setState({
      vehicleId: id
    });
  }

  handleCloseModalDelete = e => {
    this.setState({ modalDeleteIsOpen: false });
  }

  handleOpenModalDelete = e => {
    this.setState({ modalDeleteIsOpen: true });
  }

  render() {
    if (this.state.loading === true && !this.state.vehiclesList) {
      return <Loading/>;
    }
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return (
      <div className="Badges__container">
        <div className="Badges__list">
          <div className="Badges__container">
            <VehiclesList
              vehicles={this.state.vehiclesList}

              onOpenModalCreate={this.handleOpenModalCreate}
              onCloseModalCreate={this.handleCloseModalCreate}
              modalCreateIsOpen={this.state.modalCreateIsOpen}
              onCreateVehicle={this.handleSendVehicle}
              onChange={this.handleChange}
              fees={this.state.selectedFees}

              onOpenModalDelete={this.handleOpenModalDelete}
              onCloseModalDelete={this.handleCloseModalDelete}
              modalDeleteIsOpen={this.state.modalDeleteIsOpen}
              getVehicleId={this.handleGetVehicleId}
              onDeleteVehicle={this.handleRemoveVehicle}
            />
          </div>
        </div>
      </div>
    );
  }
}