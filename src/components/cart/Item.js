import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import _ from "lodash"
import { useContext, useMemo, useState } from "react";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { CartDispatch } from "../../App";
import { CartState } from "../../App";
import shopItems from '../../data/shopItems';


const Item = ({id}) => {
  const dispatchCart = useContext(CartDispatch)
  const cartState = useContext(CartState)
  const shopItem = shopItems.filter((item) => item.id === parseInt(id));
  const {name, image, price} = shopItem[0];
  const itemQty = useMemo(() => cartState.filter((item) => item.id == id)[0]?.qty || 0, [cartState, id])
  const [qty, setQty] = useState(itemQty);


  const handleIncrement = () => {
    if (itemQty < 99){
      dispatchCart({type: "increment", payload:{id: id, newQty: itemQty}})
    }else{
      dispatchCart({type: "update", payload:{id: id, newQty: 99}})
    }
  }

  const handleDecrement = () => {
    console.log(dispatchCart);
    if (itemQty > 1){
      dispatchCart({type: "decrement", payload:{id: id, newQty: itemQty}})
    }else{
      dispatchCart({type: "update", payload:{id: id, newQty: 1}})
    }
  }

  const handleInput = (e) => {
      if (_.isNumber(parseInt(e.target.value))){
        setQty(parseInt(e.target.value));
      }else{
        setQty(1);
      }
      if(e.target.value <= 0){
        setQty(1);
      }else if (e.target.value > 99){
        setQty(99);
      }
  };

  const handleBlur = (e) => {
    setQty(parseInt(e.target.value));
    dispatchCart({type: "update", payload: {id: id, newQty: parseInt(e.target.value)}});
  }

  const handleKeyInput = (e) => {
    if (e.which < 48 || e.which > 57)
    {
        e.preventDefault();
    }
  }

  const handleRemove = () => {
    dispatchCart({type: "delete", payload:{id:id}})
  };
  return (
    <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(10, 1fr)" borderBottom="1px" py="1rem">
      <GridItem  
        rowSpan={{
          base: "2",
          md: "2",
          xl: "3"
        }} 
        colSpan={{
          base: "10",
          md: "10",
          xl: "3"
        }} 
        justifySelf="center" 
        alignSelf="center"
      >
        <Link to={`/shop/${id}`}>
          <Image 
            src={image} 
            alt={name} 
            boxSize={{
              base: "10.5rem",
              md: "10.5rem",
              xl: "14rem" 
            }}
            objectFit="contain" 
            ignoreFallback
          />
        </Link>

        {/* <Im 
          src={image} 
          alt={name} 
          boxSize={{
            base: "10.5rem",
            md: "10.5rem",
            xl: "14rem" 
          }}
          objectFit="contain" 
        /> */}
        {/* <Im 
          src={image} 
          alt={name} 
          boxSize={{
            base: "10.5rem",
            md: "10.5rem",
            xl: "14rem" 
          }}
          objectFit="contain" 
        /> */}
      </GridItem>
      <GridItem  
        rowSpan={{
          base: 1,
          md: 1,
          xl: 1
          }}
        colSpan={{
          base: 10,
          md: 10,
          xl: 7
        }}
      >
        <Flex 
          justifyContent={{
            base: "space-evenly",
            md: "space-evenly",
            xl: "space-between"
          }}

          alignItems="center" 
          borderBottom={{
            base: "base",
            md: "none",
            xl: "1px"
            }}
          flexWrap="wrap"
        >
          <Heading 
            size="md" 
            as="h2" 
            width={{
              base: "100%",
              md: "100%",
              xl: "40%"
            }}
            textAlign={{
              base: "center",
              md: "center",
              xl: "left"
            }}
            alignSelf="end" 
            mb=".5rem"
          >
            <Link to={`/shop/${id}`}>
              {name}
            </Link>
          </Heading>
          <VStack 
            mb=".5rem"
            width={{
                base: '5rem',
                md: '5rem',
                xl: '5rem'
            }}
          >
            <Text 
              fontSize={{
                base: "xx-small",
                md: "xx-small",
                xl: "small"
                }} 
              color="grey"
            >
              Price
            </Text>
            <Text
              fontWeight={{
                base: "bold",
                md: "bold",
                xl: "normal"
              }}
              fontSize="medium"
            >
              ${price.toFixed(2)}
            </Text>
          </VStack>
          <VStack 
            mb=".5rem"
            ml={{
              base: "0rem",
              md: "0rem",
              xl: "0rem"
            }}
          >
            <Text 
              fontSize={{
                base: "xx-small",
                md: "xx-small",
                xl: "small"
              }}  
              color="grey"
              mt={{
                xl: ".5rem"
              }}
            >
              Qty
            </Text>
            <Flex justifyContent="center" alignSelf="end">
              <Button 
                height={{
                  base: "1.5rem",
                  md: "1.5rem",
                  xl: "2rem"
                }}
                roundedRight="0" 
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input 
                height={{
                  base: "1.5rem",
                  md: "1.5rem",
                  xl: "2rem"
                }}
                size={{
                  base: "sm",
                  md: "sm",
                  xl: "md"
                }}
                minW="3rem"
                textAlign="center"
                roundedRight="0" 
                roundedLeft="0" 
                maxW={14} 
                min={0} 
                max={99} 
                value={qty} 
                onChange={(e) => handleInput(e)}
                onBlur={(e) => handleBlur(e)}
                onKeyPress={(e) => handleKeyInput(e)}
                onPaste={(e) => e.preventDefault()}
              />
              <Button 
                height={{
                  base: "1.5rem",
                  md: "1.5rem",
                  xl: "2rem"
                }}
                roundedLeft="0" 
                onClick={handleIncrement}
              >
                +
                  
              </Button>
            </Flex>
          </VStack>
          <VStack 
            mb=".5rem" 
            textAlign="right"
            width={{
                base: '5rem',
                md: '5rem',
                xl: '5rem'
            }}
          >
            <Text 
              fontSize={{
                base: "xx-small",
                md: "xx-small",
                xl: "small"
              }}
              color="grey"
              maxWidth="4rem"
              width={{
                base: "initial",
                md: "initial",
                xl: "4rem"
              }}
            >
              Total
            </Text>
            <Text
              fontSize="medium"
              fontWeight="bold"
              maxWidth="5rem"
              width={{
                base: "initial",
                md: "initial",
                xl: "5rem"
              }}
            >
              ${(price * itemQty).toFixed(2)}
            </Text>
          </VStack>
        </Flex>
      </GridItem>
      <GridItem 
        rowSpan={1} 
        colSpan={{
          base: "10",
          md: "10",
          xl: "7"
        }} 
        justifySelf={{
          base: "center",
          md: "center",
          xl: "right"
        }}
        mt="1rem"
      >
        <Button  size="xs" onClick={() => handleRemove(id)}>Remove</Button>
      </GridItem>
    </Grid>
  )
}
const areEqual = (prevProps, nextProps) => {
  return (prevProps.id === nextProps.id)
};

export default React.memo(Item, areEqual)