
// import { useUserContext } from '../assets/Provider/UserProvider';

// const Home = () => {
//   const { loggedInUser } = useUserContext();

//   if (loggedInUser) {
//     // Accede a las propiedades del usuario
//     const { email } = loggedInUser;

//     return (
//       <div>
//         <h2>Perfil de usuario</h2>
//         <p>Email: {email}</p>
//       </div>
//     );
//   } else {
//     // El usuario no ha iniciado sesión
//     return (
//       <div>
//         <p>No has iniciado sesión</p>
//       </div>
//     );
//   }
// }

// export default Home;
import { useUserContext } from '../assets/Provider/UserProvider';

const Home = () => {
  const { loggedInUser } = useUserContext();

  if (loggedInUser) {
    // Accede a las propiedades del usuario
    const { name} = loggedInUser;

    return (
      <div>
        <h2>Perfil de usuario</h2>
        <h4>Hola {name}</h4>
      </div>
    );
  } else {
    // El usuario no ha iniciado sesión
    return (
      <div>
        <p>No has iniciado sesión</p>
      </div>
    );
  }
}

export default Home;
