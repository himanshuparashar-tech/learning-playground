import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
      <div className="mx-auto px-4 py-3 text-center">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()} Learn. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
