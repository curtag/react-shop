import {Heading, Box, Flex} from "@chakra-ui/react";
import Item from "../components/shop/Item"

const Shop = ({shopItems}) => {

  return (
    <Box pt="7rem">
      <Heading textAlign="center" mb="3rem">Shop</Heading>
      <Flex 
        flexWrap="wrap" 
        justifyContent="space-evenly" 
        maxW="95%" 
        mx="auto" 
      >
        {shopItems.map(({id, name, image, price}) => 
        <Item 
          id={id} 
          key={id} 
          name={name} 
          image={image} 
          price={price} 
        />
        )}
      </Flex>
    </Box>
  )
}

export default Shop
