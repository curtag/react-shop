import Item from "../components/shop/Item"

const Shop = ({shopItems}) => {

  return (
    <>
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
    </>
  )
}

export default Shop
