import { Box, Link, Square } from '@chakra-ui/layout'
import bgImage from '../data/images/bg-color.jpg'
import {Link as RouterLink} from "react-router-dom"
const Home = () => {
  return (
    <Box height="100vh" backgroundSize="cover" backgroundImage={`url(${bgImage})`} pt="10rem">
      <Square height="60%" >
        <Link 
          as={RouterLink}
          to="/shop"
          border=".4rem solid white"
          color="white"
          p="1rem"
          fontSize={{
            base:"1.25rem",
            md:"2rem",
            xl:"2rem"
          }}
          fontWeight="bold"
          _hover={{
            textDecor: "none",
            transform: "scale(1.1)"
          }}
        >
          Shop our produce network
        </Link>
      </Square>
    </Box>
  )
}

export default Home
