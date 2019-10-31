import React, { useState } from "react"
import "../css/main.css"
import "../css/bootstrap.css"
import { navigate } from "gatsby"

import { Layout, Navbar } from "../components/layout"

const IndexPage = () => {
  const SearchBar = () => {
    const [searchKey, setSearchKey] = useState()

    const onFormSubmit = e => {
      e.preventDefault()
      if (searchKey) {
        navigate("/search?q=" + searchKey)
      }
    }

    const ChangeSearchKey = e => {
      e.preventDefault()
      console.log(e.target.value)
      setSearchKey(e.target.value)
    }
    return (
      <div className="pt-128">
        <form onSubmit={onFormSubmit} className="search-input">
          <input
            type="text"
            value={searchKey}
            onChange={ChangeSearchKey}
            placeholder="Search |"
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
        <Navbar light={true} />
        <div className="text-center maxer-880 mx-auto pt-128">
          <h2>X5GON Search</h2>
          <h4>Find OER materials in the blink of an eye.</h4>
          <SearchBar />
        </div>
      </header>
    )
  }

  const Recommendations = () => {
    return (
      <div className="full-screen p-128 text-center">
        <h3>Popular queries</h3>
      </div>
    )
  }

  return (
    <Layout>
      <Header />
      <Recommendations />
    </Layout>
  )
}

export default IndexPage
