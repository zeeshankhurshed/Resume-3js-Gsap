import React from "react";
import { Link } from "react-router-dom";
import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center md:items-start items-center">
          <Link to={"/"}>Visit my blog</Link>
        </div>
        <div className="socials">
          {socialImgs.map((img, idx) => (
            <Link className="icon" target="_blank" to={img.url} key={idx}>
              <img src={img.imgPath} alt="" />
            </Link>
          ))}
        </div>
        <div className="flex flex-col justify-centr">
          <p className="text-center md:text-end">
            @ {new Date().getFullYear()} Zeeshan | zeeCode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
