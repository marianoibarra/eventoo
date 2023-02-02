import React from "react";
import Styles from './CartBuy.module.css'

function CartBuy({}) {
  const items = [
    {
      name: "Metallica",
      price: 500,
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Metallica_logo.png",
      quantities:'1'
    },
    {
      name: "BRESH",
      price: 100,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8l_KitA4GGIR5nFpUx6MPolaNSQyIkuy5Q&usqp=CAU",
      quantities:'4'
    },
    {
      name: "DUA LIPA",
      price: 330,
      image: "data:image/jpeg;base64,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",
      quantities:'6'
    },
  ];
  return (
    <div className={Styles.cartContainer}>
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Products</th>
            <th>Quantities</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className={Styles.image}><img className={Styles.image} src={item.image} alt={item.name} /></td>
              <td>{item.name}</td>
              <td>{item.quantities}</td>
              <td>USD${item.price*item.quantities}</td>
              <td>
                <button className="btnprimario">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartBuy;
