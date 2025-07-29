import "./profile.scss";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

const Profile = ({ name }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div className="sidebar__profile">
      <ProfileAvatar initial={initial} />
      <span className="sidebar__profile-name">{name}</span>
    </div>
  );
};

export default Profile;
