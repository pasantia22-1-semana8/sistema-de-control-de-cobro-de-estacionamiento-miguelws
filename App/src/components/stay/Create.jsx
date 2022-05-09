import React from "react";

import Modal from '../Modal';

export default function CreateStay(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div>
        <div>
          <h1>Nueva Estancia</h1>
          <p>Registre los datos de la estancia.</p>
        </div>
        <div className="m-5">
          <select className="form-select" aria-label="">
          <option selected>Seleccione el vehiculo</option>
            {props.vehicles.map(vehicle => {
                return (
                  <option value={vehicle.id}>{vehicle.placa}</option>
                );
            })}
          </select>
        </div>
        <div>
          <button onClick={props.onSubmit} className="btn btn-success ">Guardar</button>
        </div>
      </div>
    </Modal>
  );
}