import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

const Header = ({cartItemCount}) => {
  const [isHome, setIsHome] = useState(false);
  const location = useLocation();

  useEffect(()=>{
    if (location.pathname === '/') {
      setIsHome(true);
    }else{
      setIsHome(false);
    }
  })

  return (
    <header className={isHome ? 'header-home' : ''}>
      <div className="brand-name">Produce</div>
      <nav>
        <ul className="nav-list">
          <li><Link to="/" >Home</Link></li>
          <li><Link to="/shop" >Shop</Link></li>
          <li><Link to="/cart" >Cart {cartItemCount}</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
