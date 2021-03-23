import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import _ from "lodash";
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Detail from './pages/Detail';
import shopItems from './data/shopItems';
import "./styles/index.css"

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const getItemQty = (id) => {
    return (cartItems.filter((item) => item.id == id)[0])?.qty || 0
  }
  const getCartTotal = () => {
    // shopItems.filter((item) => item.id === parseInt(obj.id));
    return (cartItems.reduce(function (acc, obj) {return acc + (obj.qty * shopItems.filter((item) => item.id === parseInt(obj.id))[0].price)}, 0));
  }

  const incrementItemCount = (qty, setQty) => {
    qty < 99 ? setQty(qty + 1) : setQty(99);
  }

  const decrementItemCount = (qty, setQty) => {
    qty > 0 ? setQty(qty - 1) : setQty(0);
  }

  const updateItemCount = (e, setQty) => {
    if (_.isNumber(parseInt(e.target.value))){
      setQty(parseInt(e.target.value));
    }else{
      setQty(0);
    }
    if(e.target.value < 0){
      setQty(0);
    }else if (e.target.value > 99){
      setQty(99);
    }
  }

  useEffect(() => {
    //update item count (total quantity of all items) when items in cart change
    setCartItemCount(cartItems.reduce(function (acc, obj) { return acc + obj.qty }, 0)); 
  },[cartItems]);

  return ( 
    <BrowserRouter>
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
                setCartItems={setCartItems}
                getItemQty={getItemQty}
                incrementItemCount={incrementItemCount}
                decrementItemCount={decrementItemCount}
                updateItemCount={updateItemCount}
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
              getCartTotal={getCartTotal}
              incrementItemCount={incrementItemCount}
              decrementItemCount={decrementItemCount}
              updateItemCount={updateItemCount}
            />
          </Route>
          <Route exact path="/shop">
            <Shop shopItems={shopItems}/>
          </Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
