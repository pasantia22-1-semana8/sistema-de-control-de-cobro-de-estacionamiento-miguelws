import React from "react";

import LoginForm from '../components/LoginForm';

export default class Login extends React.Component {
  state = {
    loading: false,
    error: null,
    credentials: {
      username: '',
      password: ''
    },
  };

  handleChange = e => {
    const cred = this.state.credentials;
    cred[e.target.name] = e.target.value;
    this.setState({ credentials: cred });
  };

  render() {
    if (this.state.loading) {
      return 'Loading...';
    }
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <LoginForm
                userToken={this.props.userLogin}
                onChange={this.handleChange}
                formValues={this.state.credentials}
              />
            </div>
          </div>
        </div>
        </React.Fragment>
    );
  }
}