import React from 'react';
import { Link } from 'react-router-dom';

import './styles/List.css';
import CreateStay from './Create';

class StaysListItem extends React.Component {
  render() {
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Vehiculo</th>
            <th scope="col">Entrada</th>
            <th scope="col">Salida</th>
            <th scope="col">De Alta</th>
            <th scope="col" colSpan="2" rowSpan="2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">#</th>
            <td>{this.props.stay.vehiculo}</td>
            <td>{this.props.stay.hora_entrada}</td>
            <td>{this.props.stay.hora_salida}</td>
            <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={this.props.stay.esta_de_alta}/></td>
            <td><button className="btn btn-warning">Editar</button></td>
            <td><button className="btn btn-danger">Eliminar</button></td>
            </tr>
        </tbody>
      </table>
    );
  }
}

function useSearchStays(stays) {
  const [query, setQuery] = React.useState('');
  const [filteredStays, setfilteredStays] = React.useState(stays);

  React.useMemo(() => {
    const result = stays.filter(stay => {
      return `${stay.vehiculo}`.toLowerCase().includes(query.toLowerCase());
    })
    setfilteredStays(result);
  }, [stays, query]);
  return {query, setQuery, filteredStays}
}

export default function StaysList (props) {
  const stays = props.stays;
  const {query, setQuery, filteredStays} = useSearchStays(stays);

  if (filteredStays.length === 0) {
    return (
      <div>
        <div className="form-grup">
          <label>Filtrar Estancias</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
        </div>
        <h3>No se encontraron estancias</h3>
        <Link className='btn btn-primary' to="">
          Nueva Estancia
        </Link>
      </div>
    );
  }
  
  return (
    <div className="BadgesList">
      <button onClick={props.onOpenModal} className="btn btn-primary mt-5 m-2">Nueva Estancia</button>
        <CreateStay
          onClose={props.onCloseModal}
          isOpen={props.modalIsOpen}
          vehicles={props.vehicles}
          onSubmit={props.onSubmit}
        />
      <div className="form-grup mt-3">
        <label>Buscar estancias por placa del vehiculo</label>
        <input
          className="form-control"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
      </div>
      <ul className="list-unstyled">
        {filteredStays.map(stay => {
          return (
            <li key={stay.id}>
              <Link className='text-reset text-decoration-none' to={`/stay/${stay.id}`}>
                <StaysListItem stay={stay} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}