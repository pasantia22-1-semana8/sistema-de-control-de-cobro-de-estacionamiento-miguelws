import React from "react";

import ModalCreate from '../ModalCreate';

export default function CreateStay(props) {
  return (
    <ModalCreate isOpen={props.isOpen} onClose={props.onClose}>
      <div className="m-2">
        <h1>Confirmacion</h1>
        <p className="mt-2">Desea completar el registro del pago?</p>
        <div className="text-center mt-4">
          <button onClick={props.onCreate} className="btn btn-success margin-left-right">Si</button>
          <button onClick={props.onClose} className="btn btn-primary">No</button>
        </div>
      </div>
    </ModalCreate>
  );
}