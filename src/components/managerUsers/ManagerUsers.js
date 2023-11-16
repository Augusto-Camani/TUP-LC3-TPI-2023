import React from "react";

const ManagerUsers = () => {
  return (
    <div className="container">
      <div>
        <form>
          <input
            type="text"
            name="instrument"
            placeholder="nombre del instrumento "
            value={newInstrument.instrument}
            onChange={changeHandler}
          />
          <input
            type="number"
            name="price"
            min="1"
            step="1"
            placeholder="10 "
            value={newInstrument.price}
            onChange={changeHandler}
          />
          <input
            type="number"
            name="stock"
            min="1"
            step="1"
            placeholder="stock del instrumento "
            value={newInstrument.stock}
            onChange={changeHandler}
          />
          <button disabled={!formValid} onClick={addProductHandler}>
            add
          </button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <br />
            <th>product</th>
            <br />
            <th>price</th>
            <br />
            <th>stock</th>
          </tr>
        </thead>
        <tbody style={{}}>
          {productsFiltered.map((instrument, index) =>
            instrument.id === editID ? (
              <Edit current={instrument} list={[newInstrument]} />
            ) : (
              <tr key={index}>
                <td>{instrument.id}</td>
                <br />
                <td>{instrument.instrument}</td>
                <br />
                <td>{instrument.price}</td>
                <br />
                <td>{instrument.stock}</td>
                <td>
                  <button onClick={() => editProductHandler(instrument.id)}>
                    edit
                  </button>
                  <button>delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerUsers;
