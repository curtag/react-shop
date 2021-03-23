import Item from "../components/shop/Item"

const Shop = ({shopItems}) => {

  return (
    <div className="shop-container">
      <h1 className="shop-title">Shop</h1>
      <div className="shop-items">
        {shopItems.map(({id, name, image, price}) => 
        <Item 
          id={id} 
          key={id} 
          name={name} 
          image={image} 
          price={price} 
        />
        )}
      </div>
    </div>
  )
}

export default Shop
