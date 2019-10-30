import React, { useState } from "react"
import "../css/main.css"
import "../css/bootstrap.css"
import { navigate } from "gatsby"

import Layout from "../components/layout"

const IndexPage = () => {
  const [searchKey, setSearchKey] = useState()

  const onFormSubmit = e => {
    e.preventDefault()
    console.log("submitted")
    navigate("/search?q=" + searchKey)
  }

  const ChangeSearchKey = value => {
    setSearchKey(value)
  }

  const SearchBar = () => {
    return (
      <form onSubmit={onFormSubmit}>
        <input
          ref={input => input && input.focus()}
          type="text"
          value={searchKey}
          onChange={e => ChangeSearchKey(e.target.value)}
          placeholder="Search |"
          className="form-control align-middle mb-3"
          autoComplete="off"
        />
      </form>
    )
  }

  return (
    <Layout>
      <div className="text-center maxer-880 mx-auto">
        <h3>X5GON Search</h3>
        <h4>Find OER materials in the blink of an eye.</h4>
        <SearchBar></SearchBar>
      </div>
    </Layout>
  )
}

export default IndexPage
