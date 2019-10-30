import React from "react"
import { Link } from "gatsby"

const Layout = props => {
  return (
    <div>
      <Navbar light={"dark"} />
      {props.children}
    </div>
  )
}

const Navbar = props => {
  const content = [
    {
      li: "Our Repositories",
      link: "/",
    },
    {
      li: "About",
      link: "/",
    },
    {
      li: "Contact",
      link: "/",
    },
  ]

  return (
    <nav
      className={
        "navbar pt-3 px-md-4 navbar-expand-sm navbar-" +
        (props.light ? "light" : "dark")
      }
    >
      <div className="navbar-brand">
        <Link to="/" className="nav-link">
          <img
            src={
              "/images/logo/x5gon_logo_" +
              (props.light ? "light" : "dark") +
              ".svg"
            }
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
                <Link className="nav-link mx-md-2 x-xs-1" to={li.link}>
                  {li.li}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Layout
