import React from "react";

import ModalCreate from '../ModalCreate';

export default function CreateTicket(props) {
  return (
    <ModalCreate isOpen={props.isOpen} onClose={props.onClose}>
      <div>
        <div>
          <h1>Nuevo Ticket</h1>
          <p>Seleccione el pago, para generar el correspondiente ticket.</p>
        </div>
        <div className="m-5">
          <input className="form-control mb-3" onChange={props.onChange} type="text" name="codigo" placeholder="Codigo" required={true} />
          <select className="form-select" onChange={props.onChange} name="pago" required={true}>
          <option >Pagos</option>
            {props.payments.map(payment => {
              return <option value={payment.id} >{payment.fecha} {payment.estancia}</option>
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