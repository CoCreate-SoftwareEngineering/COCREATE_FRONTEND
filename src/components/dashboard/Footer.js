import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="footer fixed-bottom bg-dark text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="left-content">
          {/* Use Link component with 'to' prop set to "/faq" */}
          <Link to="/faq" className="btn btn-primary">FAQ</Link>
        </div>
        <div className="right-content">
          © 2024 CoCreate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
