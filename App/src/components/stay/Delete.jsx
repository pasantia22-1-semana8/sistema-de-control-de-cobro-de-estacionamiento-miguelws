import React from "react";

import '../styles/Delete.css';
import ModalDelete from '../ModalDelete';

export default function DeleteStay (props) {

  const removeStay = async (e) => {
    console.log(props.stayId);
    try {
      /*
      await fetch(`http://127.0.0.1:8000/api/v1/stays/list/${props.stayId}/`, {
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
        <p className="mt-2">Desea eliminar la estancia?</p>
        <div className="text-center mt-4">
          <button onClick={removeStay} className="btn btn-danger margin-left-right">Si</button>
          <button onClick={props.onClose} className="btn btn-primary">No</button>
        </div>
      </div>
    </ModalDelete>
  );
}