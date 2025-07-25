import React, { useEffect, useState } from "react";
import { navLinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BASEURL } from "../utils/constants";
import { toast } from "react-toastify";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  // console.log("user:", user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${BASEURL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      toast("Logout successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    logout();
    navigate("/");
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <Link to="/" className="logo">
          Zeeshan | KHD
        </Link>

        <nav className="desktop hidden md:flex ">
          <ul>
            {navLinks.map((nav, idx) => (
              <li key={nav.name || idx} className="group">
                <a href={nav.link}>
                  <span>{nav.name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="mobile-nav md:hidden absolute top-full left-0 w-full bg-black text-white z-50">
            <ul className="flex flex-col items-start px-6 py-4 gap-4">
              {navLinks.map((nav, idx) => (
                <li key={nav.name || idx}>
                  <Link to={nav.link} onClick={() => setIsOpen(false)}>
                    {nav.name}
                  </Link>
                </li>
              ))}

              {user ? (
                <>
                  {/* Admin-only options */}
                  {user.role === "admin" && (
                    <>
                      <li>
                        <Link
                          to="/signup"
                          className="contact-btn group hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          <button className=" cursor-pointer">Signup</button>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/addVideo"
                          className="contact-btn group hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          <button className=" cursor-pointer">
                            Add-Project
                          </button>
                        </Link>
                      </li>
                    </>
                  )}

                  {/* Logout + greeting */}
                  <li>
                    <button
                      className="bg-red-500 px-3 py-2 rounded-md w-full text-left"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <span className="text-sm">
                      Hi, {user.name?.slice(0, 8) || "User"}
                    </span>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}

        <div className="flex gap-2 items-center">
          <a href="#contact" className="contact-btn group cursor-pointer">
            <div className="inner">
              <span>Contact</span>
            </div>
          </a>

          {user ? (
            <>
              {user.role === "admin" && (
                <>
                  <Link
                    to="/signup"
                    className="contact-btn group hover:text-white"
                  >
                    <button className="inner cursor-pointer hidden md:block">
                      Signup
                    </button>
                  </Link>
                  <Link
                    to="/addVideo"
                    className="contact-btn group hover:text-white hidden md:block"
                  >
                    <button className="inner cursor-pointer">
                      Add-Project
                    </button>
                  </Link>
                </>
              )}

              <div className="hidden md:flex items-center">
                <button
                  className="inner px-3 py-2 rounded-md text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <span className="text-sm font-medium ">
                  Hi, {user.name?.slice(0, 8)}
                </span>
              </div>
            </>
          ) : (
            <Link to="/login" className="contact-btn group hover:text-white">
              <button className="inner cursor-pointer">Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
