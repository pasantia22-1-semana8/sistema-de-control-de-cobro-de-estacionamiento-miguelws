import React from "react";

import '../styles/Delete.css';
import ModalDelete from '../ModalDelete';

export default function DeleteVehicle (props) {

  const removeVehicle = async (e) => {
    console.log(props.vehicleId);
    try {
      /*
      await fetch(`http://127.0.0.1:8000/api/v1/vehicles/list/${props.vehicleId}/`, {
        method: 'DELETE',
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
    <ModalDelete isOpen={props.isOpen} onClose={props.onClose}>
      <div className="m-2">
        <h1>Confirmacion</h1>
        <p className="mt-2">Desea eliminar el vehiculo?</p>
        <div className="text-center mt-4">
          <button onClick={removeVehicle} className="btn btn-danger margin-left-right">Si</button>
          <button onClick={props.onClose} className="btn btn-primary">No</button>
        </div>
      </div>
    </ModalDelete>
  );
}