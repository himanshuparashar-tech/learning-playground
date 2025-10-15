import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-black/80 border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Learn. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
