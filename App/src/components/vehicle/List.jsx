import React from 'react';

import '../styles/List.css';
import CreateVehicle from './Create';
import DeleteVehicle from './Delete';

function useSearchVehicles(vehicles) {
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
    }
  }, [vehicles, query]);
  return {query, setQuery, filteredVehicles}
}

export default function VehiclesList (props) {
  const vehicles = props.vehicles;
  const {query, setQuery, filteredVehicles} = useSearchVehicles(vehicles);

  if (filteredVehicles.length !== 0) {
    return (
      <div>
        <button onClick={props.onOpenModalCreate} className="btn btn-primary mt-5 m-2">Registrar Vehiculo</button>
        <CreateVehicle
          onClose={props.onCloseModalCreate}
          isOpen={props.modalCreateIsOpen}
          onChange={props.onChange}
          onSubmit={props.onCreateVehicle}
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
        <table className="BadgesList table table-light">
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
            {filteredVehicles.map((vehicle, counter=0) => {
              return (
                <tr key={vehicle.id}>
                  <th scope="row">{counter + 1}</th>
                  <td>{vehicle.placa}</td>
                  <td>{vehicle.tarifa}</td>
                  <td>{vehicle.descripcion}</td>
                  <td><button className="btn btn-warning">Editar Registro</button></td>
                  <td>
                    <button onClick={() => {props.getVehicleId(vehicle.id); props.onOpenModalDelete(true);}} className="btn btn-danger">Eliminar Registro</button>
                    <DeleteVehicle
                      onClose={props.onCloseModalDelete}
                      isOpen={props.modalDeleteIsOpen}
                      onDelete={props.onDeleteVehicle}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="BadgesList">
        <button onClick={props.onOpenModalCreate} className="btn btn-primary mt-5 m-2">Registrar Vehiculo</button>
        <div className="form-grup mt-3 mb-5">
          <label>Buscando...</label>
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
        <h3>No se encontraron estancias</h3>
      </div>
    );
  }
}