import {React, Component} from "react";

import './styles/Stay.css';
import StaysList from '../components/stay/List';
import Layout from '../layouts/Layout';
import Error from '../pages/Error';

export default class Stay extends Component {
  state = {
    loading: true,
    error: null,
    stays: [],
    vehicles: [],
    modalIsOpen: false
  }

  componentDidMount() {
    this.fetchData();
    this.intervalId = setInterval(this.fetchData, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  fetchData = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await fetch('http://127.0.0.1:8000/api/v1/stays/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.token}`
        },
        body: JSON.stringify(this.props.userData)
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          stays: data,
          loading: false
        });
      });

      await fetch('http://127.0.0.1:8000/api/v1/vehicles/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.token}`
        },
        body: JSON.stringify(this.props.userData)
      })
      .then(data => data.json())
      .then(data => {
        this.setState({
          vehicles: data,
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

  handleSubmit = async e => {
    this.setState({
      loading: true,
      error: null
    });

    try {
      await fetch('http://127.0.0.1:8000/api/v1/stays/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.token}`
        },
        body: JSON.stringify(this.state.vehicles)
      })
      .then(data => data.json())
      .then(data => {
        console.log(data);
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error
      });
    }
  }

  handleCloseModal = (e) => {
    this.setState({ modalIsOpen: false });
  };
  
  handleOpenModal = (e) => {
    this.setState({ modalIsOpen: true });
  };

  render() {
    if (this.state.loading === true && !this.state.stays) {
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
                stays={this.state.stays}
                onOpenModal={this.handleOpenModal}
                onCloseModal={this.handleCloseModal}
                modalIsOpen={this.state.modalIsOpen}
                vehicles={this.state.vehicles}
                onSubmit={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}