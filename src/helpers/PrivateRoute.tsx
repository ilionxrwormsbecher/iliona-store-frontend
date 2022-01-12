import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
import { Unauthorized } from "../pages/Unauthorized";

type Props = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { keycloak } = useKeycloak();
  let navigate = useNavigate();

  const isLoggedIn = keycloak.authenticated;

  if (!isLoggedIn) {
    navigate("/unauthorized");
  }

  return children;
};

export default PrivateRoute;
