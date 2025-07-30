import "./profile-avatar.scss";

const ProfileAvatar = ({ name, className }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "";
  return (
    <div className={className}>
      <span>{initial}</span>
    </div>
  );
};

export default ProfileAvatar;
