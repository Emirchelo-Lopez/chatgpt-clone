import { ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button/Button";
import Navbar from "../../components/ui/Navbar/Navbar";
import "./landing-page.scss";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="welcome-page__main-content">
        <section className="hero">
          <div className="hero__container">
            <div className="hero__content">
              <h1 className="hero__title">
                <span className="hero__title-gradient">Unlock the Power</span>
                <br />
                of AI Conversations
              </h1>
              <p className="hero__description">
                Experience the future of AI with ChatGPT. Get instant answers,
                creative inspiration, and intelligent assistance for any task.
                Join millions of users who are already transforming their
                productivity.
              </p>
              <div className="hero__actions">
                <Button
                  onClick={() => navigate("/signup")}
                  className="hero__cta-btn"
                >
                  <span>Get Started Free</span>
                  <ArrowRight size={20} />
                </Button>
              </div>
              <div className="hero__stats">
                <div className="hero__stat">
                  <span className="hero__stat-number">100M+</span>
                  <span className="hero__stat-label">Active Users</span>
                </div>
                <div className="hero__stat">
                  <span className="hero__stat-number">1B+</span>
                  <span className="hero__stat-label">Conversations</span>
                </div>
                <div className="hero__stat">
                  <span className="hero__stat-number">99.9%</span>
                  <span className="hero__stat-label">Uptime</span>
                </div>
              </div>
            </div>
            <div className="hero__visual">
              <div className="hero__chat-preview">
                <div className="chat-preview">
                  <div className="chat-preview__header">
                    <div className="chat-preview__dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="chat-preview__title">ChatGPT</span>
                  </div>
                  <div className="chat-preview__messages">
                    <div className="chat-preview__message chat-preview__message--user">
                      <span>How can I improve my productivity?</span>
                    </div>
                    <div className="chat-preview__message chat-preview__message--ai">
                      <span>
                        Here are some proven strategies to boost your
                        productivity...
                      </span>
                    </div>
                    <div className="chat-preview__typing">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="welcome-footer">
        <div className="welcome-footer__container">
          <div className="welcome-footer__content">
            <div className="welcome-footer__logo">
              <div className="welcome-footer__logo-icon">
                <span>⚡</span>
              </div>
              <span className="welcome-footer__logo-text">ChatGPT</span>
            </div>
            <div className="welcome-footer__links">
              <div className="welcome-footer__column">
                <h4 className="welcome-footer__column-title">Product</h4>
                <a href="#" className="welcome-footer__link">
                  Features
                </a>
                <a href="#" className="welcome-footer__link">
                  Pricing
                </a>
                <a href="#" className="welcome-footer__link">
                  API
                </a>
              </div>
              <div className="welcome-footer__column">
                <h4 className="welcome-footer__column-title">Company</h4>
                <a href="#" className="welcome-footer__link">
                  About
                </a>
                <a href="#" className="welcome-footer__link">
                  Blog
                </a>
                <a href="#" className="welcome-footer__link">
                  Careers
                </a>
              </div>
              <div className="welcome-footer__column">
                <h4 className="welcome-footer__column-title">Support</h4>
                <a href="#" className="welcome-footer__link">
                  Help Center
                </a>
                <a href="#" className="welcome-footer__link">
                  Contact
                </a>
                <a href="#" className="welcome-footer__link">
                  Status
                </a>
              </div>
            </div>
          </div>
          <div className="welcome-footer__bottom">
            <p className="welcome-footer__copyright">
              © 2024 ChatGPT. All rights reserved.
            </p>
            <div className="welcome-footer__legal">
              <a href="#" className="welcome-footer__legal-link">
                Privacy Policy
              </a>
              <a href="#" className="welcome-footer__legal-link">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
