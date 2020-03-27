import React from "react"
import { Link } from "gatsby"

import logo_dark from "../images/logo/x5gon_logo_dark.svg"
import logo_light from "../images/logo/x5gon_logo_light.svg"

import "../css/search.css"

export const Layout = props => {
  return <div className={props.theme}>{props.children}</div>
}

export const Footer = () => {
  return (
    <div className="text-center pb-5">
      <a href="https://platform.x5gon.org">
        <p className="text-light-dark">Powered by X5GON</p>
      </a>
    </div>
  )
}
export const Navbar = props => {
  const content = [
    {
      li: "Our Databases",
      link: "/databases",
    },
    {
      li: "Contact",
      externalLink: "https://platform.x5gon.org/team",
    },
  ]

  return (
    <nav
      className={
        "navbar px-md-4 navbar-expand-sm navbar-" +
        (props.light ? "light" : "dark bg-sky")
      }
    >
      <div className="navbar-brand">
        <Link to="/" className="nav-link">
          <img
            src={props.light ? logo_light : logo_dark}
            height="22px"
            alt="logo"
          ></img>
        </Link>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon">
          <i className="fa fa-navicon" />
        </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav ml-auto">
          {content.map((li, index) => {
            return (
              <li className="nav-item active ml-lg-3" key={index}>
                {li.link ? (
                  <Link className="nav-link mx-md-2 x-xs-1" to={li.link}>
                    {li.li}
                  </Link>
                ) : (
                  <a className="nav-link mx-md-2 x-xs-1" href={li.externalLink}>
                    {li.li}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
