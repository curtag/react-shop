import { useState } from "react";

const Item = ({id, shopItems, incrementItemCount, decrementItemCount, updateItemCount, getItemQty, addToCart, removeFromCart}) => {
  // const id = match.params.id;
  const shopItem = shopItems.filter((item) => item.id === parseInt(id));
  const {name, image, price} = shopItem[0];
  const [qty, setQty] = useState(getItemQty(id));
  return (
    <div className="cartitem-container">
      <h2>{name}</h2>
      <img src={image} alt={name}></img>
      <p>{getItemQty(id)}</p>
      <p>${price.toFixed(2)}</p>
      <div className="item-input-container">
        <button type="button" className="item-decrementbutton" onClick={() => decrementItemCount(qty, setQty)} >-</button>
        <input className="item-input" type="number" min="0" max="99" defaultValue={qty} maxLength="2" value={qty} onChange={(e) => updateItemCount(e, setQty)}></input>
        <button type="button" className="item-incremementbutton" onClick={() => incrementItemCount(qty, setQty)}>+</button>
      </div>
      <button type="button" className="item-addtocartbutton" onClick={() => addToCart(id, qty)} >Update Quantity</button>
      <button type="button" className="item-removefromcartbutton" onClick={() => removeFromCart(id)}>Remove From Cart</button>
    </div>
  )
}

export default Item
