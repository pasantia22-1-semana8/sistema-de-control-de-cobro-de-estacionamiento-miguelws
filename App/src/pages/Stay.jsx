import {React, Component} from "react";

import './styles/Stay.css';
import StaysList from '../components/stay/List';
import Layout from '../layouts/Layout';
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
    }
  }

  componentDidMount() {
    this.loadStays();
    this.intervalId = setInterval(this.loadStays, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  loadStays = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await fetch('http://127.0.0.1:8000/api/v1/stays/list/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.myToken}`
        }
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          staysList: data,
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

  sendStay = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await fetch('http://127.0.0.1:8000/api/v1/stays/list/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.myToken}`
        },
        body: JSON.stringify(this.state.newStay)
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
          selectedVehicle: data,
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
      newStay: { vehiculo: e.target.value }
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
              <StaysList
                stays={this.state.staysList}

                onOpenModalCreate={this.handleOpenModalCreate}
                onCloseModalCreate={this.handleCloseModalCreate}
                modalCreateIsOpen={this.state.modalCreateIsOpen}
                onSubmitPost={this.sendStay}
                onChange={this.handleChange}
                vehicles={this.state.selectedVehicle}

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