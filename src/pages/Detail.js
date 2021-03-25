import { Badge, Image, Heading, Button, Input, HStack, Flex, Box, Text, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Detail = ({match, cartItems, shopItems, setCartItems, getItemQty, incrementItemCount, decrementItemCount, updateItemCount, addToCart, updateItemQty, removeFromCart, getCartTotal}) => {
  const id = match.params.id;
  const shopItem = shopItems.filter((item) => item.id === parseInt(id));
  const {name, image, price, description} = shopItem[0];
  const [qty, setQty] = useState(getItemQty(id));
  const [addDisabled, setAddDisabled] = useState(true);
  const [removeDisabled, setRemoveDisabled] = useState(true);

  const handleAddClick = () => {
    addToCart(id, qty);
    // setRemoveDisabled(!removeDisabled);
    console.log('item qty: ');
    console.log(getItemQty(id));

    setAddDisabled(true);
  }

  const handleRemoveClick = () => {
    removeFromCart(id);
    
    // if statement fixes bug that would cause add/update button to continue to be displayed
    // after the item had been removed from cart while input displaying 0
    if (qty === 0){
      setAddDisabled(true);
    }else{
      setAddDisabled(false);

    }
    setRemoveDisabled(true);
  }

  //removefromcartbutton behavior
  useEffect(()=>{
    setQty(getItemQty(id));
    if (getItemQty(id) !== 0){
      setRemoveDisabled(false);
    }
    if (cartItems.length === 0){
      setRemoveDisabled(true);
    }
  },[cartItems, getItemQty, id])


  useEffect(()=>{
    //if it's disabled, enable it upon qty change
    if (addDisabled){
      setAddDisabled(false)
    }

    //if the displayed quantity is 0 and the set quantity is 0, disable
    if (qty === 0 && getItemQty(id) === 0){
      setAddDisabled(true);
    }
    // //if its enabled and qty is 0, disable
    // if (!addDisabled && qty === 0 && getItemQty(id) === 0){
    //   setAddDisabled(true);
    // }
  }, [qty])

  return (
    <Box pt="7rem" textAlign="center" margin="auto" width="95%">
      <Box>
        <Heading 
          pb="1rem" 
          as="h1" 
          size="xl"
        >
          {name}
        </Heading>
        <Image 
          boxSize={{
            base: "200px",
            md: "250px",
            xl:"300px"
          }}
          objectFit="cover"
          src={image}
          alt={name}
          m="auto"
          my="0rem"
        />
        <Text fontWeight="bold" fontSize="2rem">{`$${price.toFixed(2)}`}</Text>
        <Box  
          my={10} 
          mx="auto" 
          maxW={{
            base: "95vw",
            md: "95vw",
            xl: "50vw"
          }}
        >
          <Text>{description}</Text>

        </Box>
        <Flex justifyContent="space-evenly">
          <Box>
            <Button width="6rem" disabled={removeDisabled} onClick={() => handleRemoveClick()}>Remove</Button>
          </Box>
          <Box>
            <Flex justifyContent="center">
              <Button roundedRight="0" onClick={() => decrementItemCount(qty, setQty)}>-</Button>
              <Input textAlign="center" roundedRight="0" roundedLeft="0" maxW={14} min={0} max={99} defaultValue={qty} value={qty} onChange={(e) => updateItemCount(e, setQty)}></Input>
              <Button roundedLeft="0" onClick={() => incrementItemCount(qty, setQty)}>+</Button>
            </Flex>
          </Box>
          <Box>
            <Button width="6rem" disabled={addDisabled} onClick={() => handleAddClick()}>{getItemQty(id) === 0 ? 'Add' : 'Update'}</Button>
          </Box>
        </Flex>
        { getItemQty(id) > 0 && addDisabled ? 
          <Link to="/cart">
            <Button mt="3rem" size="lg">Checkout</Button> 
          </Link>
        : <></> 
        }
      </Box>
    </Box>
  )
}

export default Detail
