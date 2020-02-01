import React, { useState } from "react"
import "../css/main.css"
import "../css/bootstrap.css"
import "../css/search.css"
import { navigate } from "gatsby"

import { Layout, Navbar } from "../components/layout"

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
          <h2 className="mt-lg-5 mt-0 mb-lg-3 mb-0 pb-3 pb-lg-3 pt-4 pt-lg-0">
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
    return (
      <div className="pt-4 mt-5 mt-lg-0 mx-4">
        <h6>
          <b>Suggested queries:</b>
          {reccs.map((word, index) => (
            <span key={word + index}>
              <span className="simulated-link" onClick={() => goTo(word)}>
                <span className="mx-3 suggested">{word}</span>
              </span>
              {index !== reccs.length - 1 ? <b>/</b> : null}
            </span>
          ))}
        </h6>
      </div>
    )
  }

  return (
    <Layout>
      <Header />
    </Layout>
  )
}

export default IndexPage
