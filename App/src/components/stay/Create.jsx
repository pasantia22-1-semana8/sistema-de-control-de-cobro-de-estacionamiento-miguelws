import React from "react";

import ModalCreate from '../ModalCreate';

export default function CreateStay(props) {
  return (
    <ModalCreate isOpen={props.isOpen} onClose={props.onClose}>
      <div>
        <div>
          <h1>Nueva Estancia</h1>
          <p>Seleccione la placa del vehiculo, a la que corresponde la estancia</p>
        </div>
        <div className="m-5">
          <select className="form-select" onChange={props.onChange}>
          <option >Placa de vehiculos</option>
          {props.vehicles && props.vehicles.map(vehicle => {
              return <option value={vehicle.id} >{vehicle.placa}</option>
            })}
          </select>
        </div>
        <div>
          <button onClick={props.onSave} className="btn btn-success">Guardar</button>
        </div>
      </div>
    </ModalCreate>
  );
}