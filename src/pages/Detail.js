import _ from "lodash";
import { useEffect, useState } from "react";

const Detail = ({match, cartItems, shopItems, setCartItems, getItemQty, incrementItemCount, decrementItemCount, updateItemCount}) => {
  const id = match.params.id;
  const shopItem = shopItems.filter((item) => item.id === parseInt(id));
  const {name, image, price} = shopItem[0];
  const [qty, setQty] = useState(getItemQty(id));
  // const incrementItemCount = () => {
  //   qty < 99 ? setQty(qty + 1) : setQty(99);
  // }
  // const decrementItemCount = () => {
  //   qty > 0 ? setQty(qty - 1) : setQty(0);
  // }
  // const updateItemCount = (e) => {
  //   if (_.isNumber(parseInt(e.target.value))){
  //     setQty(parseInt(e.target.value));
  //   }else{
  //     setQty(0);
  //   }
  //   if(e.target.value < 0){
  //     setQty(0);
  //   }else if (e.target.value > 99){
  //     setQty(99);
  //   }
  // }
  const addToCart = () => {
    //no items in cart add first item
    if (cartItems.length === 0){
      setCartItems([{id: id, qty: qty}]);
    }else{
      //we don't need to update any of our other items, only the current one
      const otherItems = (cartItems.filter((item) => item.id !== id));
      //Only add/keep items in cart that have a quantity
      if (qty !== 0){
        setCartItems([...otherItems, {id: id, qty: qty}]);
      }else{
        setCartItems([...otherItems]);
      }
    }
  }

  return (
    <div>
      <div>
        <h1 className="item-title">{name}</h1>
        <img className="item-img" src={image} alt={name}/>
        <p className="item-price">{price}</p>
        <div className="item-input-container">
          <button type="button" className="item-decrementbutton" onClick={() => decrementItemCount(qty, setQty)} >-</button>
          <input className="item-input" type="number" min="0" max="99" defaultValue={qty} maxLength="2" value={qty} onChange={(e) => updateItemCount(e, setQty)}></input>
          <button type="button" className="item-incremementbutton" onClick={() => incrementItemCount(qty, setQty)}>+</button>
        </div>
        <button type="button" className="item-addtocartbutton" onClick={addToCart}>{getItemQty(id) === 0 ? 'Add to' : 'Update'} Cart</button>
      </div>
    </div>
  )
}

export default Detail
