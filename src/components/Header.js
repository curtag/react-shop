import { useContext, useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Link, Box, Flex, Heading, Text, Spacer, Icon} from "@chakra-ui/react";
import { BsBag } from "react-icons/bs";
import { GiBarn } from "react-icons/gi";
import { CartState } from "../App";

const Header = ({cartItemCount, dispatchCartItemCount}) => {
  const cartState = useContext(CartState)
  const [isHome, setIsHome] = useState(true);
  const location = useLocation();

  useEffect(()=>{
    if (location.pathname === '/') {
      setIsHome(true);
    }else{
      setIsHome(false);
    }
  }, [location.pathname])

  useEffect(() => {
    dispatchCartItemCount({type: 'update', payload: {cartItems: cartState} })
  },[cartState, dispatchCartItemCount]);

  const BagText = ({cartItemAmt}) => {
    let cartItem;
    if (cartItemAmt >= 99){
      cartItem = <Text fontWeight="bold" fontSize=".85rem" position="absolute" mt=".9rem" ml=".6rem">99<sup>+</sup></Text>;
    
    }else if (cartItemAmt >= 20){
      cartItem = <Text fontWeight="bold" position="absolute" mt=".8rem" ml=".65rem">{parseInt(cartItemAmt)}</Text>;
    }else if(cartItemAmt >= 10){
      cartItem = <Text fontWeight="bold" position="absolute" mt=".8rem" ml=".7rem">{parseInt(cartItemAmt)}</Text>;
    }else{
      cartItem = <Text fontWeight="bold" position="absolute" mt=".8rem" ml=".9rem">{parseInt(cartItemAmt)}</Text>;
    }
    return cartItem
  }

  return (
    <Flex 
      as="header" 
      justifyContent={{
        base: "space-evenly",
        md: "space-between",
        xl: "space-between"
      }} 
      position="absolute" 
      width="100%" 
      color={isHome ? 'white' : 'black'}
      backgroundColor={isHome ? 'transparent' : 'white'}
      py={{
        base: ".5rem",
        md: "1rem",
        xl: "1rem"
      }}
      flexWrap={{
        base: "wrap",
        md: "nowrap",
        xl: "nowrap"
      }}
    >
      <Flex 
        alignItems="center" 
        as={RouterLink}
        to="/" 
      >
        <Icon 
          as={GiBarn} 
          ml={{
            base: "none",
            md: "15vw",
            xl: "15vw"
          }}
          mr={{
            base: ".5rem"
          }}
          mb={{
            base: ".5rem"
          }}
          fontSize="2rem"
        />
        <Heading
          fontFamily="Broadway"
          size="2xl"
        >
          Farm2Fam
        </Heading>
      </Flex>
      <Flex 
        as="nav" 
        align="center" 
        width={{
          base: "100%",
          md: "30%",
          xl: "30%"
        }} 
        mr={{
          base: "none",
          md: "5vw",
          xl: "5vw"
        }}
        justifyContent="space-evenly"
      >
          <Link 
            as={RouterLink} 
            to="/" 
            fontSize={{
              base: "1rem",
              md: "1.5rem",
              xl: "1.5rem"
            }} 
            fontWeight="bold"
            _hover={{
              transform: "scale(1.5)"
            }}
            _focus={{
              outline: "0"
            }}
          >
            Home
          </Link>
          <Spacer
            display={{
              base: "none",
              md: "initial",
              xl: "initial"
            }}
          />
          <Link 
            as={RouterLink} 
            to="/shop" 
            fontSize={{
              base: "1rem",
              md: "1.5rem",
              xl: "1.5rem"
            }}  
            fontWeight="bold"
            _hover={{
              transform: "scale(1.5)"
            }}
            _focus={{
              outline: "0"
            }}
          >
            Shop
          </Link>
          <Spacer
            display={{
              base: "none",
              md: "initial",
              xl: "initial"
            }}
          />
          <Link 
            as={RouterLink} 
            to="/cart"
            _hover={{
                transform: "scale(1.2)"
            }}
            _focus={{
                outline: "0"
            }}
          >
            <Box 
              transform={{
                base: "scale(.75)",
                md: "none",
                xl: "none",
              }}
            >
              <BagText cartItemAmt={cartItemCount} />
              <BsBag 
                fontSize="2.5rem"
              />
            </Box>
          </Link>
      </Flex>
    </Flex>
  )
}

export default Header
