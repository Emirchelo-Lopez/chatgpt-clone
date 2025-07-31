import { LogOut } from "lucide-react";
import Button from "../../components/ui/Button/Button";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import "./settings-page.scss";
import FormField from "../../components/ui/FormField/FormField";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMeUserService } from "../../api/userService";

const SettingsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMeUserService();
        setUserData(data);
      } catch (error) {
        console.error("Error at fetching user data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chatgpt-clone">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="settings-page">
        <div className="settings-page__container">
          {/* Settings Header */}
          <div className="settings-page__header">
            <h1 className="settings-page__title">Settings</h1>
            <p className="settings-page__subtitle">
              Manage your account and preferences
            </p>
          </div>

          {/* Account Settings */}
          <div className="account-settings">
            <div className="account-settings__header">
              <h2 className="account-settings__title">Account Information</h2>
              <p className="account-settings__description">
                Update your personal information and account details
              </p>
            </div>

            {/* Profile Picture Section */}
            <div className="account-settings__section">
              <h3 className="account-settings__section-title">
                Profile Picture
              </h3>
              <div className="profile-picture">
                <div className="profile-picture__avatar">
                  <span>{userData?.first_name?.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="account-settings__section">
              <h3 className="account-settings__section-title">
                Personal Information
              </h3>
              <div className="form-group">
                <FormField
                  label="Full Name"
                  type="text"
                  className="form-field__input"
                  value={`${userData?.first_name || ""} ${
                    userData?.last_name || ""
                  }`}
                  readOnly
                />
                <FormField
                  label="Email Address"
                  type="email"
                  className="form-field__input"
                  value={userData?.email || ""}
                  readOnly
                />
              </div>
            </div>

            {/* Account Actions */}
            <div className="account-settings__section">
              <h3 className="account-settings__section-title">
                Account Actions
              </h3>
              <div className="account-actions">
                <Button
                  onClick={handleLogout}
                  className="account-actions__btn account-actions__btn--danger"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
