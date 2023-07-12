import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="">
        <div className="footerContent">
          <div className="footerContent__left">
            <div className="footerContent__left__logo">
              <a href="/">
                <img src="/img/logo.svg" alt="" />
              </a>
            </div>
            <div className="footerContent__left__text">
              <p>
                Que vous soyez un particulier, un chasseur de tête, un patron d'entreprise ou un DRH, vous trouverez sur ce site des le candidat idéal pour votre poste.
                N'attendez plus et contactez-le dès maintenant !
              </p>
            </div>
          </div>
          <div className="footerContent__right">
            <div className="footerContent__right__links">
              <h3>Liens utiles</h3>
              <ul>
                <li>
                  <a href="/">Accueil</a>
                </li>
                <li>
                  <a href="/a-propos">A propos</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/mensions-legales">Mentions légales</a>
                </li>
              </ul>
            </div>
            <div className="footerContent__right__social">
              <h3>Suivez-nous</h3>
              <ul>
                <li>
                  <a href="https://www.facebook.com" target='_blank' rel="noreferrer">
                    <img src="/img/facebook.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com" target='_blank' rel="noreferrer">
                    <img src="/img/instagram.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com" target='_blank' rel="noreferrer">
                    <img src="/img/twitter.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com" target='_blank' rel="noreferrer">
                    <img src="/img/youtube.svg" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <p>© 2021 - Tous droits réservés</p>
        </div>
      </div>

      <div className="footerBackground"></div>

      <div className="footerBackgroundMobile"></div>

    </footer>
  );
};

export default Footer;