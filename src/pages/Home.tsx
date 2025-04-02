import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <h1>Willkommen bei ENZo Online!</h1>
      <p>Ein kooperatives Online-Spiel zur Energiewende.</p>
      <button onClick={() => alert("Spiel startet bald!")}>Spiel starten</button>
      <Link to="/about">Go to About</Link>
    </div>
  )
}

export default Home