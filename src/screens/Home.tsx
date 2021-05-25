import { useHistory } from "react-router";
import { logUserOut } from "../apollo";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const history = useHistory();
  const logout = () => {
    history.replace("/");
    logUserOut();
  };
  return (
    <div>
      <h1>Welcome Log In</h1>
      <button onClick={logout}>Log Out plz</button>
    </div>
  );
};

export default Home;
