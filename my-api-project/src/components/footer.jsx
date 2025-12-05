import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 py-md-3 bg-body-tertiary border-top">
      <div className="container px-3 px-md-4">
        <div className="row align-items-center">
          <div className="col-12 text-center">
            <span className="text-body-secondary fs-6 fs-md-7">
              &copy; {new Date().getFullYear()} Projeto React + Jikan API.
              <span className="d-none d-sm-inline"> Desenvolvido por Vanessa Teles.</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;