import "./profile.scss";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";

const Profile = ({ name, className }) => {
  return (
    <div className="sidebar__profile">
      <ProfileAvatar name={name} className={className} />
      <span className="sidebar__profile-name">{name}</span>
    </div>
  );
};

export default Profile;
