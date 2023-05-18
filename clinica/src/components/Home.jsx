import { useContext } from "react";
import { userContext } from "../routes/userContext"
const Home = () => {

  const user = useContext(userContext);
  return (
    <div>
      {user && <p>Hola {user.name}</p>}
    </div>
  )
}

export default Home