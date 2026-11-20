import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ to, children }) {

  if (to.startsWith('http')) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className="footer-atom">
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className="footer-atom">
      {children}
    </Link>
  );
}

export default Footer;