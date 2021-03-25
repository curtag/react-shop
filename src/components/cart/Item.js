import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
const Item = ({id, shopItems, incrementItemCount, decrementItemCount, updateItemCount, getItemQty, removeFromCart}) => {
  // const id = match.params.id;
  const shopItem = shopItems.filter((item) => item.id === parseInt(id));
  const {name, image, price} = shopItem[0];
  const [qty, setQty] = useState(getItemQty(id));
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
        <Image 
          src={image} 
          alt={name} 
          boxSize={{
            base: "10.5rem",
            md: "10.5rem",
            xl: "14rem" 
          }}
          objectFit="contain" 
        />
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
            {name}
          </Heading>
          <VStack mb=".5rem">
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
              base: "1rem",
              md: "1rem",
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
                onClick={() => decrementItemCount(qty, setQty, id)}
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
                defaultValue={qty} 
                value={qty} 
                onChange={(e) => updateItemCount(e, setQty, id, true)}
              />
              <Button 
                height={{
                  base: "1.5rem",
                  md: "1.5rem",
                  xl: "2rem"
                }}
                roundedLeft="0" 
                onClick={() => incrementItemCount(qty, setQty, id)}
              >
                +
                  
              </Button>
            </Flex>
          </VStack>
          <VStack mb=".5rem">
            <Text 
              fontSize={{
                base: "xx-small",
                md: "xx-small",
                xl: "small"
              }} 
              color="grey"
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
              textAlign="right"
            >
              ${(price * getItemQty(id)).toFixed(2)}
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
        <Button  size="xs" onClick={() => removeFromCart(id)}>Remove</Button>
      </GridItem>
    </Grid>
  )
}

export default Item
