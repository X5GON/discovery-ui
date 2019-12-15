import React, { useState } from "react"
import "../css/main.css"
import "../css/bootstrap.css"
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
      <div className="pt-5">
        <form onSubmit={onFormSubmit} className="search-input">
          <input
            type="text"
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
      <header>
        <Navbar light={false} />
        <div className="text-center maxer-880 mx-auto pt-128 text-white">
          <h2>X5GON Discovery</h2>
          <h4>Search and find materials from all over the world</h4>
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
      <div className="pt-4">
        <h6>
          <b>Suggested queries:</b>
          {reccs.map((word, index) => (
            <>
              <span className="simulated-link" onClick={() => goTo(word)}>
                <span className="mx-3">{word}</span>
              </span>
              {index !== reccs.length - 1 ? <b>/</b> : null}
            </>
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
