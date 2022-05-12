import React from "react";

import ModalCreate from '../ModalCreate';

export default function CreateStay(props) {
  return (
    <ModalCreate isOpen={props.isOpen} onClose={props.onClose}>
      <div>
        <div>
          <h1>Nuevo Pago</h1>
          <p>Seleccione la estancia, para generar su correspondiente pago.</p>
        </div>
        <div className="m-5">
          <select className="form-select" onChange={props.onChange}>
          <option >Estancias</option>
            {props.stays.map(stay => {
              return <option value={stay.id} >{stay.hora_entrada} {stay.vehiculo}</option>
            })}
          </select>
        </div>
        <div>
          <button onClick={props.onSubmit} className="btn btn-success">Guardar</button>
        </div>
      </div>
    </ModalCreate>
  );
}