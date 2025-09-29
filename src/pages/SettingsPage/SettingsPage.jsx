import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import FormField from "../../components/ui/FormField/FormField";
import Button from "../../components/ui/Button/Button";
import "./settings-page.scss";

const SettingsPage = () => {
  // 1. Get user info and functions directly from the AuthContext
  const { userInfo, fetchUserInfo, logout } = useAuth();
  const navigate = useNavigate();

  // 2. Fetch user info (if not already present) when the component mounts
  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  // Logout function when user clicks the respective button
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 3. Display a loading state while userInfo is being fetched
  if (!userInfo) {
    return (
      <div className="chatgpt-clone">
        <Sidebar />
        <div className="settings-page">
          <div className="settings-page__container">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="chatgpt-clone">
      <Sidebar />
      <div className="settings-page">
        <div className="settings-page__container">
          <div className="settings-page__header">
            <h1 className="settings-page__title">Settings</h1>
            <p className="settings-page__subtitle">
              Manage your account and preferences
            </p>
          </div>

          <div className="account-settings">
            <div className="account-settings__header">
              <h2 className="account-settings__title">Account Information</h2>
              <p className="account-settings__description">
                Your personal information and account details
              </p>
            </div>

            <div className="account-settings__section">
              <h3 className="account-settings__section-title">
                Profile Picture
              </h3>
              <div className="profile-picture">
                <div className="profile-picture__avatar">
                  {/* 4. Read user data directly from the `userInfo` object */}
                  <span>{userInfo?.firstName?.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="account-settings__section">
              <h3 className="account-settings__section-title">
                Personal Information
              </h3>
              <div className="form-group">
                <FormField
                  label="Full Name"
                  type="text"
                  className="form-field__input"
                  value={`${userInfo?.firstName || ""} ${
                    userInfo?.lastName || ""
                  }`}
                  readOnly
                />
                <FormField
                  label="Username"
                  type="text"
                  className="form-field__input"
                  value={userInfo?.username || ""}
                  readOnly
                />
                <FormField
                  label="Email Address"
                  type="email"
                  className="form-field__input"
                  value={userInfo?.email || ""}
                  readOnly
                />
              </div>
            </div>

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
