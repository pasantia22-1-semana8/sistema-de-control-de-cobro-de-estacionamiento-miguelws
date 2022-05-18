import React from 'react';

import '../styles/List.css';
import CreatePayment from '../payment/Create';
import DeleteTicket from './Delete';

function useSearchTickets(tickets) {
  const [query, setQuery] = React.useState('');
  const [filteredTickets, setfilteredTickets] = React.useState(tickets);

  React.useMemo(() => {
    try {
      const result = tickets.filter(ticket => {
        return `${ticket.codigo} ${ticket.estancia}`.toLowerCase().includes(query.toLowerCase());
      })
      setfilteredTickets(result);
    } catch (error) {
      console.log(error);
    }
  }, [tickets, query]);
  return {query, setQuery, filteredTickets}
}

export default function TicketsList (props) {
  const tickets = props.tickets;
  const {query, setQuery, filteredTickets} = useSearchTickets(tickets);

  if (filteredTickets.length !== 0) {
    return (
      <div>
        <div className="form-grup mt-3">
          <label>Buscar tickets por placa del vehiculo</label>
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
              <th scope="col">Codigo</th>
              <th scope="col">Informacion del registro</th>
              <th scope="col" colSpan="2" rowSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody className='table-secondary'>
            {filteredTickets.map((ticket, counter=0) => {
              return (
                <tr key={ticket.id}>
                  <th scope="row">{counter + 1}</th>
                  <td>{ticket.codigo}</td>
                  <td>{ticket.estancia}</td>
                  <td>
                    <button onClick={() => {props.getPaymentData(ticket.id); props.getStayId(ticket.estancia_id); props.getTicketId(ticket.id); props.onOpenModalCreatePayment(true);}} className="btn btn-primary">Registrar Salida</button>
                    <CreatePayment
                      onClose={props.onCloseModalCreatePayment}
                      isOpen={props.modalCreatePaymentIsOpen}
                      onCreate={props.onCreatePayment}
                    />
                  </td>
                  <td>
                    <button onClick={() => {props.getTicketId(ticket.id); props.onOpenModalDelete(true);}} className="btn btn-danger">Eliminar Registro</button>
                    <DeleteTicket
                      onClose={props.onCloseModalDelete}
                      isOpen={props.modalDeleteIsOpen}
                      onDelete={props.onDeleteTicket}
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
        <h3>No se encontraron tickets</h3>
      </div>
    );
  }
  

}