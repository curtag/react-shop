import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
              />
            )}
          />
          
          <Route exact path="/cart">
            <Cart shopItems={shopItems} cartItems={cartItems} cartItemCount={cartItemCount} setCartItems={setCartItems} getItemQty={getItemQty} getCartTotal={getCartTotal}/>
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
