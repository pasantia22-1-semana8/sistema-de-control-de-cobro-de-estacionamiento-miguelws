import React from 'react';

import '../styles/List.css';
import CreatePayment from './Create';
import DeletePayment from './Delete';

function useSearchPayments(payments) {
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
    }
  }, [payments, query]);
  return {query, setQuery, filteredPayments}
}

export default function PaymentsList (props) {
  const payments = props.payments;
  const {query, setQuery, filteredPayments} = useSearchPayments(payments);
  
  const handleClick = (id) => {
    props.getPaymentId(id);
    props.onOpenModalDelete(true);
  }

  if (filteredPayments.length !== 0) {
    return (
      <div>
        <button onClick={props.onOpenModalCreate} className="btn btn-primary mt-5 m-2">Registrar Pago</button>
        <CreatePayment
          onClose={props.onCloseModalCreate}
          isOpen={props.modalCreateIsOpen}
          onChange={props.onChange}
          onSubmit={props.onCreatePayment}
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
        <table className="BadgesList table table-light">
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
            {filteredPayments.map((payment, counter=0) => {
              return (
                <tr key={payment.id}>
                  <th scope="row">{counter + 1}</th>
                  <td>{payment.fecha}</td>
                  <td>{payment.estancia}</td>
                  <td>{payment.importe_total}</td>
                  <td><button className="btn btn-warning">Editar</button></td>
                  <td>
                    <button onClick={() => handleClick(payment.id)} className="btn btn-danger">Eliminar</button>
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
        <button onClick={props.onOpenModalCreate} className="btn btn-primary mt-5 m-2">Registrar Pago</button>
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