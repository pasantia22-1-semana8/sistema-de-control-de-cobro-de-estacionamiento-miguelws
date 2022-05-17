import React from "react";

import '../styles/Delete.css';
import ModalEdit from '../ModalEdit';

export default function EditVehicle (props) {

  const updateVehicle = async (e) => {
    console.log(props.vehicleId);
    try {
      /*
      await fetch(`http://127.0.0.1:8000/api/v1/vehicles/list/${props.vehicleId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${props.myToken}`
        }
      })
      .then(data => data.json());
      */
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ModalEdit isOpen={props.isOpen} onClose={props.onClose}>
      <div className="m-2">
        <h1>Actualizacion de datos</h1>
        <p className="mt-2">Desea editar el vehiculo?</p>
        <div className="text-center mt-4">
          <button onClick={updateVehicle} className="btn btn-danger margin-left-right">Si</button>
          <button onClick={props.onClose} className="btn btn-primary">No</button>
        </div>
      </div>
    </ModalEdit>
  );
}