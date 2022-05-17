import { Component } from "react";
import { Navigate } from "react-router-dom";

import authUser from '../components/LoginForm';

export default class Private extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      auth: false,
      role: '',
    }
  }

  setData = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    const dataUser = authUser();
    if (dataUser) {
      console.log(dataUser);
      this.setData('auth', dataUser.auth);
      this.setData('role', dataUser.role);
      this.setData('loading', false);
    }
    console.log(this.state);
  }

  render() {
    if (this.state.loading) {
      return 'Loading...';
    } else {
      const {component: RouteComponent, role} = this.props;
      if (this.state.auth) {
        if (this.state.role === role) {
          return <RouteComponent />
        } else {
          return <Navigate to="/" />
        }
      } else {
        return <Navigate to="/" />
      }            
    }
  }
}