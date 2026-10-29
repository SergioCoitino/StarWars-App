import { Link } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import "./pages.css";

export default function NotFound() {
  useSEO({
    title: "404 - Not Found | Star Wars App",
    description: "This is not the page you are looking for."
  });

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
