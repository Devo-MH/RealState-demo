import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
      <footer
        className={
          isHomePage ? "homePage_footer otherPage_footer" : "otherPage_footer"
        }
      >
        <div className="container">
          <h4>PROPERTY RENTAL</h4>
          <p>
            We are committed to simplifying your property rental journey.
            Whether you’re searching for a new home or renting out your
            property, we ensure a smooth and trusted experience.
          </p>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/termsandconditions"}>Terms And Conditions</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="container">
          <h4>Connect with us</h4>
          <p>+44 548 954 2251</p>
          <p>support@propertyrental.com</p>
          <p>All Rights Reserved By Property Rental</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
