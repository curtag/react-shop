import {Badge, Grid, GridItem, Heading, Image} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Item = ({id, name, image, price}) => {

  return (
    <Link to={`shop/${id}`}>
      <Grid 

        borderRadius="md"
        borderWidth="thin"
        boxShadow="lg"

        gridTemplateRows="repeat(4, 1fr)" 

        p={{
              base: ".25rem",
              md: ".5rem",
              xl: ".75rem" 
        }} 

        m={{
          base: "1rem",
          md: "1rem",
          xl: "1rem"
        }}

        my={{
          md: "1rem"
        }}

        h={{
          base: "calc(18rem * .5)",
          md: "calc(18rem * .75)",
          xl: "18rem"
        }}

        width={{
          base: "calc(16rem * .5)",
          md: "calc(16rem * .75)",
          xl: "16rem"
        }}
        

        _hover={{
          transform: "scale(1.2)"
        }}
      >
        <GridItem rowSpan={2} alignSelf="center">
          <Image 
            my={{
              base: "0rem",
              md: "0rem",
              xl: "1rem" 
            }}
            margin="auto" 
            p={{
              base: "0rem",
              md: "0rem",
              xl: "1rem" 
            }}
            src={image} 
            alt={name}
            boxSize={{
              base: "4rem",
              md: "5rem",
              xl: "8rem",
            }}
          />
        </GridItem>
        <GridItem 
          alignSelf="center"

        >
          <Heading 
            as="h2" 
            fontSize={{
              base: "calc(1.3rem * .7)",
              md: "calc(1.3rem * .8)",
              xl: "1.3rem"
            }}
            textAlign={{
              base: "center",
              md: "center",
              xl: "center"
            }}
          >
            {name}
          </Heading>
        </GridItem>
        <GridItem 
          alignSelf="end"
          justifySelf={{
            base: "center",
            md: "end",
            xl: "end"
          }}
        >
          <Badge 
            fontSize={{
              base: "calc(1.15rem * .7)",
              md: "calc(1.15rem * .8)",
              xl: "1.15rem"
            }}
            variant="subtle" 
            colorScheme="green" 
          >
            ${price.toFixed(2)}
          </Badge>
        </GridItem>
      </Grid>
    </Link>
  )
}

export default Item;
