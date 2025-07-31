import { Home, ArrowLeft, Search, MessageSquare } from "lucide-react";
import "./not-found.scss";
import Button from "../../components/ui/Button/Button";
import Navbar from "../../components/ui/Navbar/Navbar";

const NotFoundPage = () => {
  return (
    <div className="error-page">
      <Navbar />
      <div className="error-page__container">
        {/* Error Content */}
        <div className="error-content">
          <div className="error-content__illustration">
            <div className="error-illustration">
              <div className="error-illustration__circle">
                <span className="error-illustration__text">404</span>
              </div>
            </div>
          </div>

          <div className="error-content__text">
            <h2 className="error-content__title">Page not found</h2>
            <p className="error-content__description">
              Sorry, we couldn't find the page you're looking for. The page
              might have been moved, deleted, or the URL might be incorrect.
            </p>
          </div>

          <div className="error-content__actions">
            <Button className="error-btn error-btn--primary">
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </Button>
            <Button className="error-btn error-btn--secondary">
              <Home size={18} />
              <span>Go Home</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
