import React from "react";
import "./index.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <span className="text-muted">© {year} Copyright: Articles Feed</span>
      </div>
    </footer>
  );
};

export default Footer;
