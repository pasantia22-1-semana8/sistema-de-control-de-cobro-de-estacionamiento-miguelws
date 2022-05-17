import React from "react";

import '../styles/Delete.css';
import ModalDelete from '../ModalDelete';

export default function DeleteStay (props) {
  return (
    <ModalDelete isOpen={props.isOpen} onClose={props.onClose}>
      <div className="m-2">
        <h1>Confirmacion</h1>
        <p className="mt-2">Esta seguro de eliminar la estancia?</p>
        <div className="text-center mt-4">
          <button onClick={props.onDelete} className="btn btn-danger margin-left-right">Si</button>
          <button onClick={props.onClose} className="btn btn-primary">No</button>
        </div>
      </div>
    </ModalDelete>
  );
}