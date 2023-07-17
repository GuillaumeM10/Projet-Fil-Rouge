import React, { useContext } from 'react';
import { UserContext } from '../../../setup/contexts/UserContext';
import { Link } from "react-router-dom";

const Footer = () => {
  const { user } = useContext(UserContext)
  return (
    <footer className='defaultPaddingX'>
      <div className="">
        <div className="footerContent">
          <div className="footerContent__left">
            <div className="footerContent__left__logo">
              <Link to="/">
                <img src="/img/logo.svg" alt="" />
              </Link>
            </div>
            <div className="footerContent__left__text">
              <p>
                Que vous soyez une personne intéressée, un recruteur, une personne en charge de l'embauche ou une personne responsable des ressources humaines, vous trouverez sur ce site la candidate ou le candidat idéal pour votre poste.
                N'attendez plus et entrez en contact dès maintenant !
              </p>
            </div>
          </div>
          <div className="footerContent__right">
            <div className="footerContent__right__links">
              <h3>Liens utiles</h3>
              <ul>
                <li>
                  <Link to="/">Accueil</Link>
                </li>
                {user.id && (
                  <li>
                    <Link to="/account">Mon compte</Link>
                  </li>
                )}
                {/* <li>
                  <Link to="/a-propos">A propos</Link>
                </li> */}
                {/* <li>
                  <Link to="/contact">Contact</Link>
                </li> */}
                <li>
                  <Link to="/mentions-legales">Mentions légales</Link>
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

    </footer>
  );
};

export default Footer;