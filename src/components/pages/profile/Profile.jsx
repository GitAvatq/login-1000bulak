import { useContext } from "react";
import "./Profile.scss";
import AuthContext from "../../../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div id="profile">
      <div className="profile">
        <h1>Wellcome {user.role} !</h1>
        <p>{!user && "Что то пошло не так"}</p>
      </div>
    </div>
  );
};

export default Profile;
