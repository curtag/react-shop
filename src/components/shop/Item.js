import _ from 'lodash';
import { Link } from "react-router-dom";

const Item = ({id, name, image, price}) => {

  return (
    <Link to={`shop/${id}`}>
      <div className="item-container">
        <h2 className="item-title">{name}</h2>
        <img className="item-img" src={image} alt={name}/>
        <p className="item-price">${price.toFixed(2)}</p>
      </div>
    </Link>

  )
}

export default Item;
