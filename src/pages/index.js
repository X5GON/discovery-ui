import React, { useState } from "react"
import "../css/main.css"
import "../css/bootstrap.css"
import "../css/search.css"
import { navigate } from "gatsby"

import { Layout, Navbar, Footer } from "../components/layout"

const IndexPage = () => {
  const goTo = searchKey => {
    navigate("/search?q=" + searchKey)
  }
  const SearchBar = () => {
    const [searchKey, setSearchKey] = useState()

    const onFormSubmit = e => {
      e.preventDefault()
      if (searchKey) {
        goTo(searchKey)
      }
    }

    const ChangeSearchKey = e => {
      e.preventDefault()
      console.log(e.target.value)
      setSearchKey(e.target.value)
    }
    return (
      <div className="pt-3 pt-lg-5">
        <form onSubmit={onFormSubmit} className="search-input-home">
          <input
            type="text"
            className="search"
            value={searchKey}
            onChange={ChangeSearchKey}
            placeholder="Search for OER Material"
            autoComplete="off"
          />
          <button type="submit" />
        </form>
      </div>
    )
  }

  const Header = () => {
    return (
      <header className="mb-0">
        <Navbar light={false} />
        <div className="text-center maxer-880 mx-auto pt-128 text-white">
          <h2 className="mt-0 mb-lg-1 mb-0 pb-3 pb-lg-3 pt-4 pt-lg-0">
            X5GON Discovery
          </h2>
          <h4 className="mx-4">
            Search and find materials from all over the world
          </h4>
          <SearchBar />
          <Recommendations />
        </div>
      </header>
    )
  }

  const Recommendations = () => {
    const reccs = [
      "Machine Learning",
      "Deep Learning",
      "Support Vector Machine",
      "Climate Change",
    ]
    /*eslint-disable */
    return (
      <div className="pt-4 mt-5 mt-lg-0 mx-4 mb-5">
        <h6 className="suggested">
          <b>Suggested queries:</b>
          {reccs.map((word, index) => (
            <span key={word + index}>
              <span className="simulated-link" onClick={() => goTo(word)}>
                <span className="mx-3 suggested-word">{word}</span>
              </span>
              {index !== reccs.length - 1 ? <b>/</b> : null}
            </span>
          ))}
        </h6>
      </div>
    )
    /*eslint-enable */
  }

  const About = () => {
    const para = [
      "Search video, audio, text",
      "Results are cross-lingual",
      "Wikification of concepts",
      "View as Recommendation Engine",
      "Materials from connected OER sites",
      "Enjoy and dig deep!",
    ]
    return (
      <div className="maxer-880 mx-auto p-64 text-purple px-5">
        <h4 className="mb-4">Why is this search different?</h4>
        <div className="d-none d-md-block">
          <p className="search-description">
            The material search enables anyone to search through the indexed OER
            sites that are connected in our network via our Connect service and
            API, a library developed for acquiring behaviour data. The material
            search functionality is cross-lingual and functions as a
            Recommendation Engine.
          </p>
          <p className="search-description pr-5">
            The materials shown currently are text, video and audio which we
            have enriched through Wikification and stored into a database that
            contains data about user activities in the OER sites that integrated
            our Connect Service.
          </p>
          <p className="search-description pr-5">
            This search consists of four major components – the database,
            ingesting and processing pipeline, services and platform API – each
            employed to perform a separate task for three types of OER
            materials; text, video and audio.
          </p>
        </div>
        <div className="d-block d-md-none">
          <ul>
            {para.map(par => (
              <li className="search-description mb-2">{par}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Header />
      <About />
      <Footer />
    </Layout>
  )
}

export default IndexPage
