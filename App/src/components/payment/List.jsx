import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import '../styles/List.css';
import CreatePayment from './Create';
import DeletePayment from './Delete';

function useSearchPayments(payments) {
  let navigate = useNavigate();

  const [query, setQuery] = React.useState('');
  const [filteredPayments, setfilteredPayments] = React.useState(payments);

  React.useMemo(() => {
    try {
      const result = payments.filter(payment => {
        return `${payment.estancia}`.toLowerCase().includes(query.toLowerCase());
      })
      setfilteredPayments(result);
    } catch (error) {
      console.log(error);
      navigate('/')
    }
  }, [payments, query]);
  return {query, setQuery, filteredPayments}
}

export default function PaymentsList (props) {
  const payments = props.payments;
  const {query, setQuery, filteredPayments} = useSearchPayments(payments);

  if (filteredPayments.length === 0) {
    return (
      <div>
        <div className="form-grup">
          <label>Filtrar Pagos</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
        </div>
        <h3>No se encontraron los pagos</h3>
        <Link className='btn btn-primary' to="">
          Registrar Pago
        </Link>
      </div>
    );
  }
  
  return (
    <div className="BadgesList">
      <button onClick={props.onOpenModalCreate} className="btn btn-primary mt-5 m-2">Registrar Pago</button>
      <CreatePayment
        onClose={props.onCloseModalCreate}
        isOpen={props.modalCreateIsOpen}
        onChange={props.onChange}
        onSubmit={props.onSubmitPost}
        stays={props.stays}
      />
      <div className="form-grup mt-3">
        <label>Buscar pagos por placa del vehiculo</label>
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
              <th scope="col">Fecha</th>
              <th scope="col">Vehiculo</th>
              <th scope="col">Importe total</th>
              <th scope="col" colSpan="2" rowSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody className='table-secondary'>
          {filteredPayments.map(payment => {
            return (
              <tr>
                <th scope="row">{payment.id}</th>
                <td>{payment.fecha}</td>
                <td>{payment.estancia}</td>
                <td>{payment.importe_total}</td>
                <td><button className="btn btn-warning">Editar</button></td>
                <td>
                  <button onClick={props.onOpenModalDelete} className="btn btn-danger">Eliminar</button>
                  <DeletePayment
                    onClose={props.onCloseModalDelete}
                    isOpen={props.modalDeleteIsOpen}
                    onSubmit={props.onSubmitDelete}
                    myToken={props.myToken}
                    paymentId={''}
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