import React from "react";

import ModalCreate from '../ModalCreate';

export default function CreateVehicle(props) {
  return (
    <ModalCreate isOpen={props.isOpen} onClose={props.onClose}>
      <div>
        <h1>Nuevo Vehiculo</h1>
        <p>Registre los datos del vehiculo</p>
        <div className="m-5">
          <input className="form-control mb-3" onChange={props.onChange} type="text" name="placa" placeholder="Placa" required={true} />
          <select className="form-select" onChange={props.onChange} name="tarifa">
            <option >Tarifas</option>
            {props.fees && props.fees.map(fee => {
              return <option value={fee.id}>{fee.importe} {fee.estado_residencia} {fee.tipo_vehiculo}</option>
            })}
          </select>
          <textarea className="form-control mt-3" onChange={props.onChange} rows="3" name="descripcion" placeholder="Descripcion (opcional)" />
        </div>
        <button onClick={props.onSubmit} className="btn btn-success">Guardar</button>
      </div>
    </ModalCreate>
  );
}