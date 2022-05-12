import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import '../styles/List.css';
import CreateStay from './Create';
import DeleteStay from './Delete';

function useSearchStays(stays) {
  let navigate = useNavigate();

  const [query, setQuery] = React.useState('');
  const [filteredStays, setfilteredStays] = React.useState(stays);

  React.useMemo(() => {
    try {
      const result = stays.filter(stay => {
        return `${stay.vehiculo}`.toLowerCase().includes(query.toLowerCase());
      })
      setfilteredStays(result);
    } catch (error) {
      console.log(error);
      navigate('/')
    }
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
        <h3>No se encontraron las estancias</h3>
        <Link className='btn btn-primary' to="">
          Nueva Estancia
        </Link>
      </div>
    );
  }
  
  return (
    <div className="BadgesList">
      <button onClick={props.onOpenModalCreate} className="btn btn-primary mt-5 m-2">Nueva Estancia</button>
      <CreateStay
        onClose={props.onCloseModalCreate}
        isOpen={props.modalCreateIsOpen}
        onChange={props.onChange}
        onSubmit={props.onSubmitPost}
        vehicles={props.vehicles}
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
          autoFocus={true}
        />
      </div>
      <table className="BadgesListItem table table-light">
        <ul className="list-unstyled">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Vehiculo</th>
              <th scope="col">Entrada</th>
              <th scope="col">De Alta</th>
              <th scope="col" colSpan="2" rowSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody className='table-secondary'>
          {filteredStays.map(stay => {
            return (
              <tr>
                <th scope="row">{stay.id}</th>
                <td>{stay.vehiculo}</td>
                <td>{stay.hora_entrada}</td>
                <td><input onChange={e => {}} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={stay.esta_de_alta} /></td>
                <td><button className="btn btn-warning">Editar</button></td>
                <td>
                  <button onClick={props.onOpenModalDelete} className="btn btn-danger">Eliminar</button>
                  <DeleteStay
                    onClose={props.onCloseModalDelete}
                    isOpen={props.modalDeleteIsOpen}
                    onSubmit={props.onSubmitDelete}
                    myToken={props.myToken}
                    stayId={''}
                  />
                </td>
              </tr>
            );
          })}
          </tbody>
        </ul>
      </table>
    </div>
  );
}