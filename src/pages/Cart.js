import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import Item from "../components/cart/Item";
import shopItems from '../data/shopItems';



const Cart = ({
  getCartTotalCost, 
  cartItemCount,
  cartState
}) => {
  const cartIds =  cartState.map((item) => item.id);
  const shopItemsToRender = shopItems.filter((item) => cartIds.includes(item.id.toString()));

  const handleCheckout = () => {
    alert("Oopsies.")
  }

  const ShopItems = () => {
    return (
      shopItemsToRender.map((item) => (
        <Item 
          key={item.id}
          id={item.id} 
        />
      ))
    )
  }

  const CartTotal = () => {
    return (
      <Flex 
            justifyContent="end"
            pt="1rem"
          >
            <VStack 
              width={{
                base: "100%",
                md: "40%",
                xl: "40%"
              }}
              alignContent="end" 
              justifyContent="end" 
              justifySelf="end" 
              align={{
                base: "center",
                md: "self-end",
                xl: "self-end"
              }}
            >
              <HStack justifyContent="right">
                <Text width="8rem">Bag Subtotal</Text>
                <Text align="right" width="8rem" >${getCartTotalCost().toFixed(2)}</Text>
              </HStack>
              <HStack justifyContent="right">
                <Text width="8rem">Tax</Text>
                <Text align="right" width="8rem" >${(getCartTotalCost()*.075).toFixed(2)}</Text>
              </HStack>
              <HStack justifyContent="right" borderBottom="1px">
                <Text width="8rem">Shipping</Text>
                <Text align="right" width="8rem" >${(cartItemCount * .45).toFixed(2)}</Text>
              </HStack>
              <HStack justifyContent="right" fontSize="1.5rem" fontWeight="bold">
                <Text width="8rem">Total</Text>
                <Text align="right" width="8rem" >${(getCartTotalCost() + (getCartTotalCost()*.075) + (cartItemCount * .45)).toFixed(2)}</Text>
              </HStack>
            </VStack>
        </Flex>
    )
  }

  return (
    <Box pt="8rem" backgroundColor="rgba(0,0,0, .125)" pb="3rem" minHeight="100vh">
      <Box width="90%" mx="auto" backgroundColor="white" boxShadow="dark-lg" borderRadius="md">
        <Box width="95%" mx="auto">
          <Heading 
            as="h1" 
            size="lg" 
            py={3} 
            pt="2rem" 
            borderBottom="1px"
            textAlign={{
              base: "center",
              md: "center",
              xl: "left"
            }}
          >
            {shopItemsToRender.length !== 0 ? "Items in Your Bag" : "Your Bag is Empty"}
          </Heading>
          <Box>
            <ShopItems/>
            {shopItemsToRender.length !== 0 ? <CartTotal/> : <Box width="100%" py="2.5rem"/> }
          </Box>
        </Box>
        {shopItemsToRender.length !== 0 ?
        <Flex 
          justify={{
            base: "center",
            md: "end",
            xl: "end"
          }}
          mt="1rem" 
          borderTop="1px"
        >
          <Button 
            my="1rem" 
            mr={{
              base: "0rem",
              md: "0rem",
              xl: "2rem"
            }}
            size="lg" 
            onClick={() => handleCheckout()}
          >Check Out</Button>
      </Flex> : <></>}
      </Box>
    </Box>
  )
}

export default React.memo(Cart)
