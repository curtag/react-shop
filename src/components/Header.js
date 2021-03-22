import { Link } from "react-router-dom"

const Header = ({cartItemCount}) => {
  return (
    <header>
      <div className="brand-name">kick stop</div>
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
