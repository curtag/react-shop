import React from 'react';
import { useReducer } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Detail from './pages/Detail';
import shopItems from './data/shopItems';
import { Box } from '@chakra-ui/layout';
import "./data/fonts/fonts.css"
import { useToast } from '@chakra-ui/toast';
function itemCountReducer(count, action){
  switch(action.type){
    case 'update':
      return action.payload.cartItems.reduce(function (acc, obj) { return acc + obj.qty }, 0)
    default:
      return count
  }
}

function cartReducer(cartState, action){
  switch (action.type) {
    case 'add':
          //no items in cart add first item
      if (cartState.length === 0){
        return ([{id: action.payload.id, qty: action.payload.qty}]);
      }else{
        //we don't need to update any of our other items, only the current one
        const otherItems = (cartState.filter((item) => item.id.toString() !== action.payload.id.toString()));
        //Only add/keep items in cart that have a quantity
        if (action.payload.qty !== 0){
          return([...otherItems, {id: action.payload.id.toString(), qty: action.payload.qty}]);
        }else{
          return ([...otherItems]);
        }
      }
    case 'delete':
      const otherItems = (cartState.filter((item) => item.id.toString() !== action.payload.id.toString()));
      return ([...otherItems]);
    case 'increment':
        if (action.payload.id || action.payload.id === 0 ){
              //no items in cart add first item
          if (cartState.length === 0){
            return ([{id: action.payload.id, qty: action.payload.newQty + 1}]);
          }else{
            //we don't need to update any of our other items, only the current one
            const otherItems = (cartState.filter((item) => item.id.toString() !== action.payload.id.toString()));
            //Only add/keep items in cart that have a quantity
            if (action.payload.newQty !== 0){
              return([...otherItems, {id: action.payload.id.toString(), qty: action.payload.newQty + 1}]);
            }else{
              return([...otherItems]);
            }
          }
        }
      break;
    case 'decrement':
      if (action.payload.id || action.payload.id === 0 ){
            //no items in cart add first item
        if (cartState.length === 0){
          return ([{id: action.payload.id, qty: action.payload.newQty - 1}]);
        }else{
          //we don't need to update any of our other items, only the current one
          const otherItems = (cartState.filter((item) => item.id.toString() !== action.payload.id.toString()));
          //Only add/keep items in cart that have a quantity
          if (action.payload.newQty !== 0){
            return([...otherItems, {id: action.payload.id.toString(), qty: action.payload.newQty - 1}]);
          }else{
            return([...otherItems]);
          }
        }
      }
      break;
    case 'update':
      if (cartState.length === 0){
        return ([{id: action.payload.id, qty: action.payload.newQty}]);
      }else{
        //we don't need to update any of our other items, only the current one
        const otherItems = (cartState.filter((item) => item.id.toString() !== action.payload.id.toString()));
        //Only add/keep items in cart that have a quantity
        if (action.payload.newQty !== 0){
          return([...otherItems, {id: action.payload.id.toString(), qty: action.payload.newQty}]);
        }else{
          return([...otherItems]);
        }
      }
    default:
      break;
  }
}

export const CartDispatch = React.createContext(null);
export const CartState = React.createContext(null);

function App() {
  const [cartItemCount, dispatchCartItemCount] = useReducer(itemCountReducer, 0);  
  const [cartState, dispatchCart] = useReducer(cartReducer, [])

  const getCartTotalCost = () => {
    return (cartState.reduce(function (acc, obj) {return acc + (obj.qty * shopItems.filter((item) => item.id === parseInt(obj.id))[0].price)}, 0));
  }

  return (
    <CartState.Provider value={cartState}>
      <CartDispatch.Provider value={dispatchCart}>
        <Box as={BrowserRouter} basename={process.env.PUBLIC_URL} backgroundColor="grey" overflow="scroll">
          <Header 
            cartItemCount={cartItemCount} 
            dispatchCartItemCount={dispatchCartItemCount} 
            cartState={cartState}
          />
          <Switch >
              <Route 
                exact 
                path="/shop/:id" 
                render={ routeProps => ( 
                  <Detail 
                    {...routeProps}
                  />
                )}

              />             
              <Route 
                exact 
                path="/cart"
              >
                <Cart 
                  shopItems={shopItems} 
                  getCartTotalCost={getCartTotalCost}
                  cartItemCount={cartItemCount} 
                  dispatchCart={dispatchCart}
                  cartState={cartState}
                />
              </Route>
              <Route exact path="/shop">
                <Shop shopItems={shopItems}/>
              </Route>
              <Route exact path="/" component={Home}></Route>
            </Switch>
        </Box>
      </CartDispatch.Provider>
    </CartState.Provider>
  );
}

export default App;
