import { Box } from '@chakra-ui/layout'
import bgImage from '../data/images/bg-bw.jpg'
const Home = () => {
  return (
    <Box height="100vh" backgroundSize="cover" backgroundImage={`url(${bgImage})`} pt="10rem">
    </Box>
  )
}

export default Home
