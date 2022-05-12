import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import '../styles/List.css';
import CreateTicket from './Create';
import DeleteTicket from './Delete';

function useSearchTickets(tickets) {
  let navigate = useNavigate();

  const [query, setQuery] = React.useState('');
  const [filteredTickets, setfilteredTickets] = React.useState(tickets);

  React.useMemo(() => {
    try {
      const result = tickets.filter(ticket => {
        return `${ticket.codigo} ${ticket.pago}`.toLowerCase().includes(query.toLowerCase());
      })
      setfilteredTickets(result);
    } catch (error) {
      console.log(error);
      navigate('/')
    }
  }, [tickets, query]);
  return {query, setQuery, filteredTickets}
}

export default function TicketsList (props) {
  const tickets = props.tickets;
  const {query, setQuery, filteredTickets} = useSearchTickets(tickets);

  if (filteredTickets.length === 0) {
    return (
      <div>
        <div className="form-grup">
          <label>Filtrar Tickets</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
        </div>
        <h3>No se encontraron los tickets</h3>
        <Link className='btn btn-primary' to="">
          Generar Ticket
        </Link>
      </div>
    );
  }
  
  return (
    <div className="BadgesList">
      <button onClick={props.onOpenModalCreate} className="btn btn-primary mt-5 m-2">Generar Ticket</button>
      <CreateTicket
        onClose={props.onCloseModalCreate}
        isOpen={props.modalCreateIsOpen}
        onChange={props.onChange}
        onSubmit={props.onSubmitPost}
        payments={props.payments}
      />
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
      <table className="BadgesListItem table table-light">
        <ul className="list-unstyled">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Codigo</th>
              <th scope="col">Informacion del pago</th>
              <th scope="col" colSpan="2" rowSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody className='table-secondary'>
          {filteredTickets.map(ticket => {
            return (
              <tr>
                <th scope="row">{ticket.id}</th>
                <td>{ticket.codigo}</td>
                <td>{ticket.pago}</td>
                <td><button className="btn btn-warning">Editar</button></td>
                <td>
                  <button onClick={props.onOpenModalDelete} className="btn btn-danger">Eliminar</button>
                  <DeleteTicket
                    onClose={props.onCloseModalDelete}
                    isOpen={props.modalDeleteIsOpen}
                    onSubmit={props.onSubmitDelete}
                    myToken={props.myToken}
                    tickettId={''}
                  />
                </td>
              </tr>
            );
          })}
          </tbody>
        </ul>
      </table>
    </div>
  );
}