import "./profile-avatar.scss";

const ProfileAvatar = ({ initial }) => {
  return (
    <div className="sidebar__profile-avatar">
      <span>{initial}</span>
    </div>
  );
};

export default ProfileAvatar;
