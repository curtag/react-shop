import _ from "lodash";
import { useEffect, useState } from "react";

const Detail = ({match, cartItems, shopItems, setCartItems, getItemQty, incrementItemCount, decrementItemCount, updateItemCount, addToCart, updateItemQty, removeFromCart}) => {
  const id = match.params.id;
  const shopItem = shopItems.filter((item) => item.id === parseInt(id));
  const {name, image, price} = shopItem[0];
  const [qty, setQty] = useState(getItemQty(id));
  const [addDisabled, setAddDisabled] = useState(true);
  const [removeDisabled, setRemoveDisabled] = useState(true);

  const handleAddClick = () => {
    addToCart(id, qty);
    // setRemoveDisabled(!removeDisabled);
    console.log('item qty: ');
    console.log(getItemQty(id));

    setAddDisabled(true);
  }

  const handleRemoveClick = () => {
    removeFromCart(id);
    
    // if statement fixes bug that would cause add/update button to continue to be displayed
    // after the item had been removed from cart while input displaying 0
    if (qty === 0){
      setAddDisabled(true);
    }else{
      setAddDisabled(false);

    }
    setRemoveDisabled(true);
  }

  //this updates the input when removefromcartbutton clicked
  useEffect(()=>{
    setQty(getItemQty(id));
    if (getItemQty(id) !== 0){
      setRemoveDisabled(false);
    }
    if (cartItems.length === 0){
      setRemoveDisabled(true);
    }
  },[cartItems, getItemQty, id])


  useEffect(()=>{
    //if it's disabled, enable it upon qty change
    if (addDisabled){
      setAddDisabled(false)
    }

    //if the displayed quantity is 0 and the set quantity is 0, disable
    if (qty === 0 && getItemQty(id) === 0){
      setAddDisabled(true);
    }
    // //if its enabled and qty is 0, disable
    // if (!addDisabled && qty === 0 && getItemQty(id) === 0){
    //   setAddDisabled(true);
    // }
  }, [qty])

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
        <button type="button" disabled={addDisabled} className="item-addtocartbutton" onClick={() => handleAddClick()}>{getItemQty(id) === 0 ? 'Add to cart' : 'Update quantity'}</button>
        <button type="button" disabled={removeDisabled} className="item-removefromcartbutton" onClick={() => handleRemoveClick()}>Remove From Cart</button>
      </div>
    </div>
  )
}

export default Detail
