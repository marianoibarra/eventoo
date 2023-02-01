import React from "react";
import Styles from './CartBuy.module.css'

function CartBuy({}) {
  const items = [
    {
      name: "Metallica",
      price: 500,
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Metallica_logo.png",
      cantidad:'1'
    },
    {
      name: "BRESH",
      price: 500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8l_KitA4GGIR5nFpUx6MPolaNSQyIkuy5Q&usqp=CAU",
      cantidad:'3'
    },
  ];
  return (
    <div className={Styles.cartContainer}>
      <h2>Carrito de Compras</h2>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Producto</th>
            <th>cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <img className={Styles.image} src={item.image} alt={item.name} />
              <td>{item.name}</td>
              <td>{item.cantidad}</td>
              <td>USD${item.price*item.cantidad}</td>
              <td>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartBuy;
