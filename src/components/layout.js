import React from "react"
import { Link } from "gatsby"

import logo_dark from "../images/logo/x5gon_logo_dark.svg"
import logo_light from "../images/logo/x5gon_logo_light.svg"

import "../css/search.css"

export const Layout = props => {
  return (
    <div className={props.theme}>
      {props.children}
      {/* <Footer /> */}
    </div>
  )
}

export const Navbar = props => {
  const content = [
    {
      li: "Our Databases",
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
        "navbar px-md-4 navbar-expand-sm navbar-" +
        (props.light ? "light" : "dark bg-sky")
      }
    >
      <div className="navbar-brand">
        {props.light ? (
          <Link to="/" className="nav-link">
            <img
              src={props.light ? logo_light : logo_dark}
              height="22px"
              alt="logo"
            ></img>
          </Link>
        ) : (
          <a href="https://platform.x5gon.org" className="nav-link">
            <img
              src={props.light ? logo_light : logo_dark}
              height="22px"
              alt="logo"
            ></img>
          </a>
        )}
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

export const Footer = () => {
  const contents = {
    "GO-TO": [
      {
        page: "Products",
        link: "/#products",
      },
      {
        page: "Join",
        link: "/join",
      },
      {
        page: "Policy",
        link: "/policy",
      },
      {
        page: "Team",
        link: "/team",
      },
    ],
    PRODUCTS: [
      {
        page: "recommend",
        link: "/products/recommend",
      },
      {
        page: "analytics",
        link: "/products/analytics",
      },
      {
        page: "discovery",
        link: "/products/discovery",
      },
      {
        page: "translate",
        link: "/products/translate",
      },
      {
        page: "connect",
        link: "/products/connect",
      },
      {
        page: "feed",
        link: "/products/feed",
      },
    ],
    CONTACT: [
      {
        page: "General Enquiries",
        link: "mailto:info@x5gon.org",
      },
      {
        page: "Partnering Projects",
        link: "mailto:partnering@x5gon.org",
      },
      {
        page: "Project Coordination",
        link: "mailto:admin@x5gon.org",
      },
      {
        page: "Press Enquiries",
        link: "mailto:press@x5gon.org",
      },
    ],
    SUPPORT: [
      {
        page: "Github Repository",
        externalLink: "https://github.com/JozefStefanInstitute/x5gon",
      },
      /* {
				page: 'Cookies Subpage',
				link: 'Cookies Subpage'
			}, */
      {
        page: "Documentation",
        externalLink: "/files/x5gon-docs.pdf",
      },
      {
        page: "Privacy & policy",
        link: "/privacy",
      },
    ],
  }
  const UL = name => {
    name = name.name
    const style = "d-block footer-li-text"
    return (
      <div className={"col-6 col-md-3 pl-0 pb-5"}>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "3.4px",
            lineHeight: "24px",
            fontWeight: "700",
          }}
        >
          {name}
        </p>
        {contents[name].map((object, index) => {
          if (object.externalLink) {
            return (
              <a
                style={{ textTransform: "capitalize" }}
                href={object.externalLink}
                key={index}
                className={style}
                target="blank"
              >
                {object.page}
              </a>
            )
          } else if (name !== "CONTACT") {
            return (
              <Link
                style={{ textTransform: "capitalize" }}
                to={object.link}
                key={index}
                className={style}
              >
                {object.page}
              </Link>
            )
          } else {
            return (
              <a
                style={{ textTransform: "capitalize" }}
                href={object.link}
                key={index}
                className={style}
              >
                {object.page}
              </a>
            )
          }
        })}
      </div>
    )
  }
  return (
    <div className="foot bg-black text-white p-md-5">
      <div className="maxer mx-auto row py-5 px-4">
        <div className="col-md-3 col-lg-4 col-12 pl-0 pb-4 pb-md-0 px-1 mt-5 mt-md-0">
          <Link to="/">
            <img
              src={"/imgs/logo/x5gon_logo_dark.svg"}
              height="22px"
              alt="logo"
            ></img>
          </Link>
        </div>
        <div className="col-md-9 col-lg-8 col-12 mt-4 mt-md-0 pl-3 ml-1 pl-md-0 ml-md-0">
          <div className="row border-bottom flex-row-reverse flex-md-row">
            <UL name="GO-TO"></UL>
            <UL name="PRODUCTS"></UL>
            <UL name="CONTACT"></UL>
            <UL name="SUPPORT"></UL>
          </div>
          <div className="row mt-5">
            <div className="col-2 m-0 pl-0">
              <img
                alt="flag"
                src="/imgs/euflag.png"
                width="100%"
                className="m-0"
              />
            </div>
            <div className="col-9 m-0 col-xl-7">
              <p
                className="my-auto m-0 p-0 footer-li-text"
                style={{ lineHeight: "20px" }}
              >
                This project has received funding from the European Union’s
                Horizon new policy 2020 research and innovation programme under
                grant agreement No 761758.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
