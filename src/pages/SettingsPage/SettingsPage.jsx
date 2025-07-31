import { LogOut } from "lucide-react";
import Button from "../../components/ui/Button/Button";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import "./settings-page.scss";
import FormField from "../../components/ui/FormField/FormField";

const SettingsPage = () => {
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
                  <span>V</span>
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
                  value="Emir López"
                  readOnly
                />
                <FormField
                  label="Email Address"
                  type="email"
                  className="form-field__input"
                  value="emir.lopez@example.com"
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
                <Button className="account-actions__btn account-actions__btn--danger">
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
