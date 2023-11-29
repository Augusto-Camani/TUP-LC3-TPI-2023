import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { useAPI } from "../../services/apiContext/api.context";
import { useSales, useUsers } from "../../custom/useAPIMethods/useAPIMethods";
import SalesFilter from "../salesFilter/SalesFilter";

const Sales = () => {
  const { users, sales } = useAPI();
  const userObject = { id: 0, email: "" };
  const [salesFiltered, setSalesFiltered] = useState(sales);
  const [userSelected, setUserSelected] = useState(userObject);
  const salesUsers = [...new Set(sales.map((sale) => sale.userID))].map(
    (userID) => ({ id: userID, email: users[userID - 1].email })
  );

  useUsers();
  useSales();
  useEffect(() => setSalesFiltered(sales), [sales]);

  const userChangeHandler = (value) => {
    if (value) {
      setUserSelected(salesUsers.find((u) => u.id === value));
      const newSalesFiltered = sales.filter((sale) => sale.userID === value);
      setSalesFiltered(newSalesFiltered);
    } else {
      setUserSelected(userObject);
      setSalesFiltered(sales);
    }
  };

  return (
    <div
      className="d-flex flex-column m-auto my-3"
      style={{ minWidth: "30rem", maxWidth: "75%" }}
    >
      <div className="d-flex align-self-center w-75 mb-3">
        <h2 className="flex-grow-1 text-center">
          {userSelected.email
            ? `Historial de compras de ${userSelected.email}`
            : "Historial de ventas"}
        </h2>
        <SalesFilter
          salesUsers={salesUsers}
          userSelected={userSelected}
          userChange={userChangeHandler}
        />
      </div>
      <div className="align-self-center w-75">
        {sales.length > 0 ? (
          salesFiltered.length > 0 ? (
            <Table striped bordered hover>
              <thead className="text-center align-middle">
                <tr>
                  <th>
                    ID DE
                    <br />
                    VENTA
                  </th>
                  <th className="w-auto">COMPRADOR</th>
                  <th className="w-auto">INSTRUMENTO</th>
                  <th>PRECIO</th>
                  <th className="text-break" style={{ minWidth: "4rem" }}>
                    CANTIDAD
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesFiltered.map((sale) =>
                  sale.content.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">{sale.id}</td>
                      <td className="text-break w-auto">
                        {users[sale.userID - 1].email}
                      </td>
                      <td className="text-break w-auto">{item.instrument}</td>
                      <td className="text-end">${item.price}</td>
                      <td className="text-end">{item.quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          ) : (
            <h3>
              No se encontraron compras realizadas por {userSelected.email}
            </h3>
          )
        ) : (
          <h3>No se encontraron ventas</h3>
        )}
      </div>
    </div>
  );
};

export default Sales;
