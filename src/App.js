import { useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import _ from "lodash";
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Detail from './pages/Detail';
import shopItems from './data/shopItems';
import { Box } from '@chakra-ui/layout';
// import "./styles/index.css"

function itemCountReducer(count, action){
  switch(action.type){
    case 'update':
      return action.payload.cartItems.reduce(function (acc, obj) { return acc + obj.qty }, 0)
    default:
      return count
  }
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  const [cartItemCount, dispatchItemCount] = useReducer(itemCountReducer, 0);
  

  const getItemQty = (id) => {
    return (cartItems.filter((item) => item.id == id)[0])?.qty || 0
  }

  const addToCart = (id, qty) => {
    //no items in cart add first item
    if (cartItems.length === 0){
      setCartItems([{id: id, qty: qty}]);
    }else{
      //we don't need to update any of our other items, only the current one
      const otherItems = (cartItems.filter((item) => item.id.toString() !== id.toString()));
      //Only add/keep items in cart that have a quantity
      if (qty !== 0){
        setCartItems([...otherItems, {id: id.toString(), qty: qty}]);
      }else{
        setCartItems([...otherItems]);
      }
    }
  }

  const removeFromCart = (id) => {
    const otherItems = (cartItems.filter((item) => item.id.toString() !== id.toString()));
    setCartItems(...[otherItems]);
  }

  const getCartTotalCost = () => {
    // shopItems.filter((item) => item.id === parseInt(obj.id));
    return (cartItems.reduce(function (acc, obj) {return acc + (obj.qty * shopItems.filter((item) => item.id === parseInt(obj.id))[0].price)}, 0));
  }

  const incrementItemCount = (qty, setQty, id) => {
    qty < 99 ? setQty(qty + 1) : setQty(99);
    let newQty = 0;
    if (qty < 99){
      setQty(qty + 1);
      newQty = qty + 1;
    }else{
      setQty(99);
      newQty = 99;
    }
    if (id || id ===0 ){
      addToCart(id, newQty === 0 ? 1 : newQty);
    }
  }

  const decrementItemCount = (qty, setQty, id) => {
    let newQty = 0;
    if (qty > 0){
      setQty(qty-1);
      newQty = qty -1;
    } else {
      setQty(0);
      newQty = 0;
    }
    if (id || id === 0){
      console.log(newQty)
      addToCart(id, newQty === 0 ? 1 : newQty);
    }
  }

  const updateItemCount = (e, setQty, id, overwrite=false) => {
    let newQty = 0;
    if (_.isNumber(parseInt(e.target.value))){
      setQty(parseInt(e.target.value));
      newQty = parseInt(e.target.value);
    }else{
      setQty(0);
      newQty = 0;
    }
    if(e.target.value < 0){
      setQty(0);
      newQty = 0;
    }else if (e.target.value > 99){
      setQty(99);
      newQty = 99;
    }
    if (overwrite){
      addToCart(id, newQty);
    }
  }

  useEffect(() => {
    //update item count (total quantity of all items) when items in cart change
    // setCartItemCount(cartItems.reduce(function (acc, obj) { return acc + obj.qty }, 0)); 
    dispatchItemCount({type: 'update', payload: {cartItems: cartItems} })
  },[cartItems]);

  return ( 
    <Box as={BrowserRouter} backgroundColor="grey" overflow="scroll">
      <Header cartItemCount={cartItemCount}/>
      <Switch >
          <Route 
            exact 
            path="/shop/:id" 
            render={(props) => ( 
              <Detail 
                {...props}
                cartItems={cartItems}
                shopItems={shopItems}
                getItemQty={getItemQty}
                incrementItemCount={incrementItemCount}
                decrementItemCount={decrementItemCount}
                updateItemCount={updateItemCount}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            )}
          />
          
          <Route exact path="/cart">
            <Cart 
              shopItems={shopItems} 
              cartItems={cartItems} 
              cartItemCount={cartItemCount} 
              setCartItems={setCartItems} 
              getItemQty={getItemQty} 
              getCartTotalCost={getCartTotalCost}
              incrementItemCount={incrementItemCount}
              decrementItemCount={decrementItemCount}
              updateItemCount={updateItemCount}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </Route>
          <Route exact path="/shop">
            <Shop shopItems={shopItems}/>
          </Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
    </Box>
  );
}

export default App;
