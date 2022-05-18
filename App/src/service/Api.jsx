const BASE_URL = 'http://127.0.0.1:8000/api/v1/';

const api = {
  auth: {
    get(credentials) {
      return fetch(BASE_URL + 'auth/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
      });
    },
  },
  stays: {
    list(token) {
      return fetch(BASE_URL + 'stays/list/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    },
    create(token, stay) {
      return fetch(BASE_URL + 'stays/list/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(stay)
      });
    },
    update(token, stayId) {
      return fetch(BASE_URL + `stays/list/${stayId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    },
    remove(token, stayId) {
      return fetch(BASE_URL + `stays/list/${stayId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    }
  },
  tickets: {
    list(token) {
      return fetch(BASE_URL + 'stays/tickets/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    },
    create(token, ticket) {
      return fetch(BASE_URL + 'stays/tickets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(ticket)
      });
    },
    remove(token, ticketId) {
      return fetch(BASE_URL + `stays/tickets/${ticketId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    }
  },
  payments: {
    list(token) {
      return fetch(BASE_URL + 'stays/payments/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    },
    create(token, payment) {
      return fetch(BASE_URL + 'stays/payments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(payment)
      });
    },
    remove(token, paymentId) {
      return fetch(BASE_URL + `stays/payments/${paymentId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    }
  },
  vehicles: {
    list(token) {
      return fetch(BASE_URL + 'vehicles/list/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    },
    create(token, vehicle) {
      return fetch(BASE_URL + 'vehicles/list/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(vehicle)
      });
    },
    remove(token, vehicleId) {
      return fetch(BASE_URL + `vehicles/list/${vehicleId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    }
  },
  fees: {
    list(token) {
      return fetch(BASE_URL + 'vehicles/fees/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    },
  }
};

export default api;