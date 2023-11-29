import { Dropdown, DropdownButton } from "react-bootstrap";
import { FunnelFill } from "react-bootstrap-icons";

import "./SalesFilter.css";

const SalesFilter = ({ salesUsers, userSelected, userChange }) => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      align="end"
      title={
        <>
          {userSelected.email ? userSelected.email : "Filtrar por usuario"}{" "}
          <FunnelFill size="1.25rem" />
        </>
      }
      onSelect={(value) => userChange(parseInt(value))}
    >
      {userSelected.email && (
        <Dropdown.Item key="0" eventKey={0}>
          Reiniciar Filtro
        </Dropdown.Item>
      )}
      {salesUsers.map((user, index) => (
        <Dropdown.Item key={index + 1} eventKey={user.id}>
          {user.email}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default SalesFilter;
