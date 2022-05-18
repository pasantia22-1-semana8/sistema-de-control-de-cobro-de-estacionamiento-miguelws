import React from 'react';

import '../styles/List.css';
import DeletePayment from './Delete';

function useSearchPayments(payments) {
  const [query, setQuery] = React.useState('');
  const [filteredPayments, setfilteredPayments] = React.useState(payments);

  React.useMemo(() => {
    try {
      const result = payments.filter(payment => {
        return `${payment.fecha} ${payment.ticket}`.toLowerCase().includes(query.toLowerCase());
      })
      setfilteredPayments(result);
    } catch (error) {
      console.log(error);
    }
  }, [payments, query]);
  return {query, setQuery, filteredPayments}
}

export default function PaymentsList (props) {
  const payments = props.payments;
  const {query, setQuery, filteredPayments} = useSearchPayments(payments);
  
  if (filteredPayments.length !== 0) {
    return (
      <div>
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
        <table className="BadgesList table table-light">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Fecha</th>
              <th scope="col">Informacion del ticket</th>
              <th scope="col">Importe total</th>
              <th scope="col" colSpan="2" rowSpan="2">Acciones</th>
            </tr>
          </thead>
          <tbody className='table-secondary'>
            {filteredPayments.map((payment, counter=0) => {
              return (
                <tr key={payment.id}>
                  <th scope="row">{counter + 1}</th>
                  <td>{payment.fecha}</td>
                  <td>{payment.ticket}</td>
                  <td>Q. {payment.importe_total}</td>
                  <td>
                    <button onClick={() => {props.getPaymentId(payment.id); props.onOpenModalDelete(true);}} className="btn btn-danger">Eliminar Registro</button>
                    <DeletePayment
                      onClose={props.onCloseModalDelete}
                      isOpen={props.modalDeleteIsOpen}
                      onDelete={props.onDeletePayment}
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
        <h3>No se encontraron pagos</h3>
      </div>
    );
  }
}