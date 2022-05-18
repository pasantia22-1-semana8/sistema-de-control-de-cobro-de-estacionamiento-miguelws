import React from 'react';

import '../styles/List.css';
import CreateStay from './Create';
import CreateTicket from '../ticket/Create';
import DeleteStay from './Delete';

function useSearchStays(stays) {
  const [query, setQuery] = React.useState('');
  const [filteredStays, setfilteredStays] = React.useState(stays);

  React.useMemo(() => {
    try {
      const result = stays.filter(stay => {
        return `${stay.vehiculo}`.toLowerCase().includes(query.toLowerCase());
      })
      setfilteredStays(result);
    } catch (error) {
      console.log(error);
    }
  }, [stays, query]);
  return {query, setQuery, filteredStays}
}

export default function StaysList (props) {
  const stays = props.stays;
  const {query, setQuery, filteredStays} = useSearchStays(stays);

  if (filteredStays.length !== 0) {
    return (
      <div>
        <button onClick={props.onOpenModalCreate} className="btn btn-primary mt-5 m-2">Registrar Entrada</button>
        <CreateStay
          onClose={props.onCloseModalCreate}
          isOpen={props.modalCreateIsOpen}
          onChange={props.onChange}
          onSave={props.onSaveStay}
          vehicles={props.vehicles}
        />
        <div className="form-grup mt-3">
          <label>Buscar estancias por placa del vehiculo</label>
          <input
            className="form-control"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            autoFocus={true}
          />
        </div>
        <table className="BadgesList table table-light">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Vehiculo</th>
              <th scope="col">Entrada</th>
              <th scope="col" colSpan="2" rowSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody className='table-secondary'>
            {filteredStays.map((stay, counter=0) => {
              return (
                <tr key={stay.id}>
                  <th scope="row">{counter + 1}</th>
                  <td>{stay.vehiculo}</td>
                  <td>{stay.hora_entrada}</td>
                  <td>
                    <button onClick={() => {props.getTicketData(stay.id); props.onOpenModalCreateTicket(true);}} className="btn btn-primary">Generar Ticket</button>
                    <CreateTicket
                      onClose={props.onCloseModalCreateTicket}
                      isOpen={props.modalCreateTicketIsOpen}
                      onCreate={props.onCreateTicket}
                    />
                  </td>
                  <td>
                    <button onClick={() => {props.getStayId(stay.id); props.onOpenModalDelete(true);}} className="btn btn-danger">Eliminar Registro</button>
                    <DeleteStay
                      onClose={props.onCloseModalDelete}
                      isOpen={props.modalDeleteIsOpen}
                      onDelete={props.onDeleteStay}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="BadgesList">
        <button onClick={props.onOpenModalCreate} className="btn btn-primary mt-5 m-2">Registrar Entrada</button>
        <div className="form-grup mt-3 mb-5">
          <label>Buscando...</label>
          <input
            className="form-control"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            autoFocus={true}
          />
        </div>
        <h3>No se encontraron estancias</h3>
      </div>
    );
  }
}

//<input onChange={e => {}} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={stay.esta_de_alta} />