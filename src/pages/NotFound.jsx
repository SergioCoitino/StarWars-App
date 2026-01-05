import { Link } from "react-router-dom";


import "./pages.css";

export default function NotFound() {
  return (
    <>

      <div className="notfound-container">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">
          This is not the page you are looking for.
        </p>

        <Link to="/" className="notfound-button">
          Return to the Home
        </Link>
      </div>
    </>
  );
}
