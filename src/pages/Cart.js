const Cart = ({shopItems, cartItems, getItemQty, getCartTotal}) => {
  const cartIds =  cartItems.map((item) => item.id);
  const shopItemsToRender = shopItems.filter((item) => cartIds.includes(item.id.toString()));
  return (
    <>
      <h1 className="cart-title">Cart</h1>
      <div className="cart-items">
        {shopItemsToRender.length !== 0 ? 
          shopItemsToRender.map((item) => (
            <div>
              <h2>{item.name}</h2>
              <img src={item.image} alt={item.name}></img>
              <p>{getItemQty(item.id)}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))
          : 
            <div>It looks like you're afraid to spend money. Go buy stuff.</div>}
        <div>Total: ${getCartTotal().toFixed(2)}</div>
          
      </div>
    </>
  )
}

export default Cart
