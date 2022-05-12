import {React, Component} from "react";

import './styles/Stay.css';
import VehiclesList from '../components/vehicle/List';
import Layout from '../layouts/Layout';
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
    }
  }

  componentDidMount() {
    this.loadVehicles();
    this.intervalId = setInterval(this.loadVehicles, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  loadVehicles = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await fetch('http://127.0.0.1:8000/api/v1/vehicles/list/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.myToken}`
        }
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          vehiclesList: data,
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

  sendVehicle = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await fetch('http://127.0.0.1:8000/api/v1/vehicles/list/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.myToken}`
        },
        body: JSON.stringify(this.state.newVehicle)
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
      await fetch('http://127.0.0.1:8000/api/v1/vehicles/fees/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.myToken}`
        }
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          selectedFees: data,
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
      newVehicle: {
        ...this.state.newVehicle,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.newVehicle);
  }

  handleCloseModalDelete = e => {
    this.setState({ modalDeleteIsOpen: false });
  }

  handleOpenModalDelete = e => {
    this.setState({ modalDeleteIsOpen: true });
  }

  render() {
    if (this.state.loading === true && !this.state.vehiclesList) {
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
              <VehiclesList
                vehicles={this.state.vehiclesList}

                onOpenModalCreate={this.handleOpenModalCreate}
                onCloseModalCreate={this.handleCloseModalCreate}
                modalCreateIsOpen={this.state.modalCreateIsOpen}
                onSubmitPost={this.sendVehicle}
                onChange={this.handleChange}
                fees={this.state.selectedFees}

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