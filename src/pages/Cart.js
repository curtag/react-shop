import Item from "../components/cart/Item";

const Cart = ({shopItems, cartItems, getItemQty, getCartTotal, incrementItemCount, decrementItemCount, updateItemCount, addToCart, removeFromCart}) => {
  const cartIds =  cartItems.map((item) => item.id);
  const shopItemsToRender = shopItems.filter((item) => cartIds.includes(item.id.toString()));
  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      <div className="cart-items">
        {shopItemsToRender.length !== 0 ? 
          shopItemsToRender.map((item) => (
            <Item 
              id={item.id} 
              getItemQty={getItemQty} 
              shopItems={shopItems} 
              incrementItemCount={incrementItemCount} 
              decrementItemCount={decrementItemCount} 
              updateItemCount={updateItemCount} 
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))
          : 
            <div>It looks like you're afraid to spend money. Go buy stuff.</div>}
        <div>Total: ${getCartTotal().toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Cart
