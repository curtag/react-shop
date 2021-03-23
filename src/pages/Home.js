import bgImage from '../data/images/bg-bw.jpg'
const Home = () => {
  return (
    <div 
      className="home-container"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      This is home.
    </div>
  )
}

export default Home
