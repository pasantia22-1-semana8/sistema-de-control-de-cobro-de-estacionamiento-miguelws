import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import '../styles/List.css';
import CreateVehicle from './Create';
import DeleteVehicle from './Delete';

function useSearchVehicles(vehicles) {
  let navigate = useNavigate();

  const [query, setQuery] = React.useState('');
  const [filteredVehicles, setfilteredVehicles] = React.useState(vehicles);

  React.useMemo(() => {
    try {
      const result = vehicles.filter(vehicle => {
        return `${vehicle.placa} ${vehicle.tarifa} ${vehicle.descripcion}`.toLowerCase().includes(query.toLowerCase());
      })
      setfilteredVehicles(result);
    } catch (error) {
      console.log(error);
      navigate('/')
    }
  }, [vehicles, query]);
  return {query, setQuery, filteredVehicles}
}

export default function VehiclesList (props) {
  const vehicles = props.vehicles;
  const {query, setQuery, filteredVehicles} = useSearchVehicles(vehicles);

  if (filteredVehicles.length === 0) {
    return (
      <div>
        <div className="form-grup">
          <label>Filtrar Vehiculos</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
        </div>
        <h3>No se encontraron los vehiculos</h3>
        <Link className='btn btn-primary' to="">
          Registrar Vehiculo
        </Link>
      </div>
    );
  }
  
  return (
    <div className="BadgesList">
      <button onClick={props.onOpenModalCreate} className="btn btn-primary mt-5 m-2">Registrar Vehiculo</button>
      <CreateVehicle
        onClose={props.onCloseModalCreate}
        isOpen={props.modalCreateIsOpen}
        onChange={props.onChange}
        onSubmit={props.onSubmitPost}
        fees={props.fees}
      />
      <div className="form-grup mt-3">
        <label>Buscar vehiculos por placa</label>
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
              <th scope="col">Placa</th>
              <th scope="col">Tarifa</th>
              <th scope="col">Descripcion</th>
              <th scope="col" colSpan="2" rowSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody className='table-secondary'>
          {filteredVehicles.map(vehicle => {
            return (
              <tr>
                <th scope="row">{vehicle.id}</th>
                <td>{vehicle.placa}</td>
                <td>{vehicle.tarifa}</td>
                <td>{vehicle.descripcion}</td>
                <td><button className="btn btn-warning">Editar</button></td>
                <td>
                  <button onClick={props.onOpenModalDelete} className="btn btn-danger">Eliminar</button>
                  <DeleteVehicle
                    onClose={props.onCloseModalDelete}
                    isOpen={props.modalDeleteIsOpen}
                    onSubmit={props.onSubmitDelete}
                    myToken={props.myToken}
                    vehicleId={''}
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